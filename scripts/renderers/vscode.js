import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { default as _debug } from "debug";
const debug = _debug("renderer:vscode");

import pkg from "../../package.json";
import { copy } from "./utils.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const ROOT_DIR = path.join(__dirname, "../..");
const OUTPUT_DIR = path.join(ROOT_DIR, "vscode");
const SNIPPETS_DIR = path.join(OUTPUT_DIR, "snippets");
const PASSTHROUGH_FILES = ["README.md", "CHANGELOG.md", "LICENSE"];

const renderSnippet = (snippet) => {
	return {
		scope: snippet.scope.join(","),
		prefix: snippet.prefix,
		description: snippet.description,
		body: snippet.body.split("\n"),
	};
};

export const render = async (snippets) => {
	await fs.rm(SNIPPETS_DIR, { recursive: true });
	fs.mkdir(SNIPPETS_DIR);

	const snippetFiles = snippets.reduce((acc, snippet) => {
		const renderedSnippet = renderSnippet(snippet);
		snippet.scope
			.map((scope) => scope.toLowerCase())
			.forEach((scope) => {
				acc[scope] ||= {};

				acc[scope][snippet.name] = renderedSnippet;
			});

		return acc;
	}, {});

	await Promise.all(
		Object.entries(snippetFiles).map(([language, body]) => {
			const filePath = path.join(SNIPPETS_DIR, `${language}.code-snippets`);
			debug(
				"Writting %o with %o snippets",
				filePath.replace(OUTPUT_DIR, "").replace(/\\/g, "/"),
				Object.keys(body).length,
			);

			return fs.writeFile(filePath, JSON.stringify(body, null, 2));
		}),
	);

	const contributes = {
		snippets: Object.keys(snippetFiles).map((language) => {
			return {
				language: language,
				path: `./snippets/${language}.code-snippets`,
			};
		}),
	};

	debug("Updating %o", "package.json");
	const packageJSONPath = path.join(OUTPUT_DIR, "./package.json");
	const packageJSON = JSON.parse(await fs.readFile(packageJSONPath, "utf8"));
	packageJSON.version = pkg.version;
	packageJSON.contributes = contributes;
	await fs.writeFile(
		packageJSONPath,
		JSON.stringify(packageJSON, null, "	"),
		"utf8",
	);
	debug("%o updated!", "package.json");

	debug("Copying %o", PASSTHROUGH_FILES);
	await Promise.all(
		PASSTHROUGH_FILES.map((file) => copy(file, ROOT_DIR, OUTPUT_DIR)),
	);
	debug("%o copied!", PASSTHROUGH_FILES);
};
