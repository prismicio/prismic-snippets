import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { default as _debug } from "debug";
const debug = _debug("build");

import fm from "front-matter";
import globby from "globby";

import { vscode } from "./renderers/index.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// Config
const SRC_DIR = path.join(__dirname, "../src");
const RENDERERS = [vscode];

// Helpers
const getSnippetFiles = () => {
	return globby("**/*.md", {
		cwd: SRC_DIR,
	});
};

const readSnippetFiles = (snippetFiles) => {
	return Promise.all(snippetFiles.map(readSnippetFile));
};

const readSnippetFile = async (snippetFile) => {
	const filePath = path.join(SRC_DIR, snippetFile);
	const file = await fs.readFile(filePath, "utf8");

	const { attributes, body } = fm(file);

	return {
		...attributes,
		scope: Array.isArray(attributes.scope)
			? attributes.scope
			: [attributes.scope],
		// Only keep code block content
		body: body.replace(/^.*?```\w*\n+/m, "").replace(/\n+```.*\n?$/m, ""),
	};
};

const renderSnippets = (snippets) => {
	return Promise.all(RENDERERS.map((renderer) => renderer.render(snippets)));
};

// Process
const run = async () => {
	debug("Looking for snippet files...");
	const snippetFiles = await getSnippetFiles();
	debug("%o snippet files found!", snippetFiles.length);

	debug("Reading snippet files...");
	const snippets = await readSnippetFiles(snippetFiles);
	debug(
		"Read: %o!",
		snippets.map((snippet) => `${snippet.name} (${snippet.scope.join(", ")})`),
	);

	debug("Rendering snippets...");
	await renderSnippets(snippets);
};

run();
