import fs from "node:fs/promises";
import path from "node:path";

export const mkNewDir = async (dir) => {
	try {
		await fs.rm(dir, { recursive: true });
	} catch (error) {
		// Ignore
	}

	await fs.mkdir(dir);
};

export const copy = async (name, inputDir, outputDir, throwOnError = false) => {
	try {
		await fs.copyFile(path.join(inputDir, name), path.join(outputDir, name));
	} catch (error) {
		if (throwOnError) {
			throw error;
		} else {
			console.error(error);
		}
	}
};

export const ucFirst = (str) => {
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};
