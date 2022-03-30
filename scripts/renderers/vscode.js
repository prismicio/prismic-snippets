import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { default as _debug } from "debug";
const debug = _debug("renderer:vscode");

import { mkNewDir, copy } from "./utils.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const ROOT_DIR = path.join(__dirname, "../..");
const OUTPUT_DIR = path.join(ROOT_DIR, "vscode");
const SNIPPETS_DIR = path.join(OUTPUT_DIR, "snippets");
const PASSTHROUGH_FILES = ["README.md", "CHANGELOG.md", "LICENSE"];

const renderSnippet = (snippet) => {
	return {
		scope: snippet.scope,
		prefix: snippet.prefix,
		description: snippet.description,
		body: snippet.body.split("\n"),
	};
};

const getSnippetFiles = (snippets) => {
	return snippets.reduce((acc, snippet) => {
		snippet.scope
			.map((scope) => scope.toLowerCase())
			.forEach((scope) => {
				acc[scope] ||= {};

				acc[scope][snippet.name] = renderSnippet({ ...snippet, scope });
			});

		return acc;
	}, {});
};

const writeSnippetFiles = (snippetFiles) => {
	return Promise.all(
		Object.entries(snippetFiles).map(([language, body]) => {
			const filePath = path.join(SNIPPETS_DIR, `${language}.code-snippets`);
			debug(
				"Writting %o with %o snippets",
				filePath.replace(OUTPUT_DIR, "").replace(/\\/g, "/").replace(/^\//, ""),
				Object.keys(body).length,
			);

			return fs.writeFile(filePath, JSON.stringify(body, null, 2));
		}),
	);
};

const updatePackageJSON = async (snippetFiles) => {
	debug("Updating %o", "package.json");
	const contributes = {
		snippets: Object.keys(snippetFiles)
			.sort()
			.map((language) => {
				return {
					language: language,
					path: `./snippets/${language}.code-snippets`,
				};
			}),
	};
	const rootPackageJSONPath = path.join(ROOT_DIR, "./package.json");
	const rootPackageJSON = JSON.parse(
		await fs.readFile(rootPackageJSONPath, "utf8"),
	);
	const packageJSONPath = path.join(OUTPUT_DIR, "./package.json");
	const packageJSON = JSON.parse(await fs.readFile(packageJSONPath, "utf8"));
	packageJSON.version = rootPackageJSON.version;
	packageJSON.contributes = contributes;
	await fs.writeFile(
		packageJSONPath,
		JSON.stringify(packageJSON, null, "	"),
		"utf8",
	);
	debug("%o updated!", "package.json");
};

export const render = async (snippets) => {
	await mkNewDir(SNIPPETS_DIR);

	const snippetFiles = getSnippetFiles(snippets);

	await Promise.all([
		writeSnippetFiles(snippetFiles),
		updatePackageJSON(snippetFiles),
	]);

	debug("Copying %o", PASSTHROUGH_FILES);
	await Promise.all(
		PASSTHROUGH_FILES.map((file) => copy(file, ROOT_DIR, OUTPUT_DIR)),
	);
	debug("%o copied!", PASSTHROUGH_FILES);
};
