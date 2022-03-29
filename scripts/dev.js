import path from "node:path";
import url from "node:url";

import { default as _debug } from "debug";
const debug = _debug("dev");

import chokidar from "chokidar";

import * as process from "./process.js";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const handler = () => {
	console.clear();
	const now = new Date();
	debug(
		"Change detected, rebuilding... (%o)",
		`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
	);
	process.run();
};

chokidar
	.watch("**/*.md", {
		cwd: path.join(__dirname, "../src"),
		persistent: true,
	})
	// .on("add", handler)
	.on("change", handler)
	.on("unlink", handler)
	.on("ready", handler);
