import { defineSchnipselConfig } from "schnipsel";

export default defineSchnipselConfig({
	input: {
		directory: "src",
	},

	// Update or remove renderers according to desired result...
	renderers: [
		{
			name: "vscode",
			options: {
				outputDirectory: "vscode/snippets",
				passthroughFileCopy: {
					"./README.md": "./vscode/README.md",
					"./CHANGELOG.md": "./vscode/CHANGELOG.md",
					"./LICENSE": "./vscode/LICENSE",
				},
				packageJSON: "vscode/package.json",
			},
		},
		{
			name: "sublime",
			options: {
				outputDirectory: "sublime/snippets",
			},
		},
		{
			name: "intellij",
			options: {
				outputDirectory: "intellij/src/main/resources/liveTemplates",
				pluginXML: "intellij/src/main/resources/META-INF/plugin.xml",
			},
		},
	],
});
