import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { default as _debug } from "debug";
const debug = _debug("renderer:sublime");

import { mkNewDir } from "./utils.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const ROOT_DIR = path.join(__dirname, "../..");
const OUTPUT_DIR = path.join(ROOT_DIR, "sublime");
const SNIPPETS_DIR = path.join(OUTPUT_DIR, "snippets");
const SCOPE_MAP = {
	html: "text.html",
	javascript: "source.js",
	javascriptreact: "source.jsx",
	typescript: "source.ts",
	typescriptreact: "source.tsx",
	"vue-html": "text.html.vue",
	vue: "text.html.vue",
};

const renderSnippet = (snippet) => {
	const regexpMagic = /(\$)([a-z(]+)([^$])/gi;

	return /* xml */ `<snippet>
	<content><![CDATA[
${snippet.body}
]]></content>
	<tabTrigger>${snippet.prefix}</tabTrigger>
	<scope>${SCOPE_MAP[snippet.scope]}</scope>
	<description>${snippet.description}</description>
</snippet>`.replace(regexpMagic, "\\$1$2$3");
};

const getSnippetFiles = (snippets) => {
	return snippets.reduce((acc, snippet) => {
		snippet.scope
			.map((scope) => scope.toLowerCase())
			.filter(
				(scope, _, arr) => !(scope === "html" && arr.includes("vue-html")),
			)
			.forEach((scope) => {
				acc[`${scope}-${snippet.name.toLowerCase().replace(/\s/g, "-")}`] =
					renderSnippet({ ...snippet, scope });
			});

		return acc;
	}, {});
};

const writeSnippetFiles = (snippetFiles) => {
	return Promise.all(
		Object.entries(snippetFiles).map(([name, body]) => {
			const filePath = path.join(SNIPPETS_DIR, `${name}.sublime-snippet`);
			debug(
				"Writting %o",
				filePath.replace(OUTPUT_DIR, "").replace(/\\/g, "/").replace(/^\//, ""),
			);

			return fs.writeFile(filePath, body);
		}),
	);
};

export const render = async (snippets) => {
	await mkNewDir(SNIPPETS_DIR);

	const snippetFiles = getSnippetFiles(snippets);

	await writeSnippetFiles(snippetFiles);
};
