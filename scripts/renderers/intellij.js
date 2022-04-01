import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { default as _debug } from "debug";
const debug = _debug("renderer:intellij");

import escapeHTML from "escape-html";

import { mkNewDir, ucFirst } from "./utils.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const ROOT_DIR = path.join(__dirname, "../..");
const OUTPUT_DIR = path.join(ROOT_DIR, "intellij/src/main/resources");
const SNIPPETS_DIR = path.join(OUTPUT_DIR, "liveTemplates");

/**
 * @see Regex101 expression: {@link https://regex101.com/r/quBBdv/2}
 */
const VARIABLE_REGEX = /\${(?<name>\d)(:(?<default>[^$]+?))?}/gim;
const VARIABLE_CLEANUP_REGEX = /\${\d:(.+?)}/gim;

const renderSnippet = (snippet) => {
	let body = snippet.body;
	const variableRegex = new RegExp(VARIABLE_REGEX);
	const variables = {};
	let match;
	while ((match = variableRegex.exec(snippet.body))) {
		body = body.replace(match[0], `$${match.groups.name}$`);
		variables[match.groups.name] = match.groups.default ?? "";
	}
	body = escapeHTML(body)
		.replace(VARIABLE_CLEANUP_REGEX, "$1")
		.replace(/\n/g, "&#10;");

	return /* xml */ `<template
	name="${snippet.prefix}"
	value="${body}"
	description="${escapeHTML(snippet.description)}"
	toReformat="true"
	toShortenFQNames="true"
>${variables[1] ? "\n	" : ""}${Object.entries(variables)
		.map(
			([name, defaultValue]) =>
				/* xml */ `<variable name="${escapeHTML(name)}" expression="${
					defaultValue ? escapeHTML(`enum("${defaultValue}")`) : ""
				}" defaultValue="${escapeHTML(defaultValue)}" alwaysStopAt="true"/>`,
		)
		.join("\n	")}
	<context>
		<option name="${snippet.scope.replace(/-/g, "").toUpperCase()}" value="true"/>
	</context>
</template>`;
};

const getSnippetFiles = (snippets) => {
	const files = snippets.reduce((acc, snippet) => {
		snippet.scope
			.map((scope) => scope.toLowerCase())
			.filter(
				(scope, _, arr) => !(scope === "html" && arr.includes("vue-html")),
			)
			.forEach((scope) => {
				acc[ucFirst(scope)] ||= [];

				acc[ucFirst(scope)].push(renderSnippet({ ...snippet, scope }));
			});

		return acc;
	}, {});

	return Object.entries(files).reduce((acc, [name, renderedSnippets]) => {
		acc[name] = `<templateSet group="${name}">
	${renderedSnippets.join("\n")}
</templateSet>`;

		return acc;
	}, {});
};

const writeSnippetFiles = (snippetFiles) => {
	return Promise.all(
		Object.entries(snippetFiles).map(([name, body]) => {
			const filePath = path.join(SNIPPETS_DIR, `${name}.xml`);
			debug(
				"Writting %o with %o snippets",
				filePath.replace(OUTPUT_DIR, "").replace(/\\/g, "/").replace(/^\//, ""),
				(body.match(/<\/template>/g) ?? []).length,
			);

			return fs.writeFile(filePath, body);
		}),
	);
};

const updatePluginXML = async (snippetFiles) => {
	debug("Updating %o", "plugin.xml");
	const extensions = Object.keys(snippetFiles)
		.map((name) => `<defaultLiveTemplates file="/liveTemplates/${name}.xml"/>`)
		.join("\n\t\t");

	const pluginXMLPath = path.join(OUTPUT_DIR, "./META-INF/plugin.xml");
	let pluginXML = await fs.readFile(pluginXMLPath, "utf8");
	if (
		pluginXML.includes("<!--PRISMIC-->") &&
		pluginXML.includes("<!--ENDPRISMIC-->")
	) {
		pluginXML = pluginXML.replace(
			/<!--PRISMIC-->([\s\S]*?)<!--ENDPRISMIC-->/,
			`<!--PRISMIC-->\n\t\t${extensions}\n\t\t<!--ENDPRISMIC-->`,
		);
	} else {
		pluginXML = pluginXML.replace(
			/<\/extensions>/,
			`\t<!--PRISMIC-->\n\t\t${extensions}\n\t\t<!--ENDPRISMIC-->\n\t</extensions>`,
		);
	}
	await fs.writeFile(pluginXMLPath, pluginXML, "utf8");
	debug("%o updated!", "plugin.xml");
};

export const render = async (snippets) => {
	await mkNewDir(SNIPPETS_DIR);

	const snippetFiles = getSnippetFiles(snippets);

	await Promise.all([
		writeSnippetFiles(snippetFiles),
		updatePluginXML(snippetFiles),
	]);
};
