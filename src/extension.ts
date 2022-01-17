import * as vscode from "vscode";

export const activate = (context: vscode.ExtensionContext) => {
	const prismicImage = vscode.languages.registerCompletionItemProvider(
		["javascriptreact", "typescriptreact"],
		{
			provideCompletionItems(
				_document: vscode.TextDocument,
				_position: vscode.Position,
			) {
				const snippetCompletion = new vscode.CompletionItem("prismic-image");
				snippetCompletion.insertText = new vscode.SnippetString(
					"Good ${1|morning,afternoon,evening|}. It is ${1}, right?",
				);
				snippetCompletion.documentation = new vscode.MarkdownString(
					"Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.",
				);

				return [snippetCompletion];
			},
		},
	);
	context.subscriptions.push(prismicImage);
};

export const deactivate = () => {
	/* ... */
};
