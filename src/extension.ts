import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {

	// show message on first activation of the extension

	//context.globalState.update("informationMessageShown", false);
	if (!context.globalState.get("informationMessageShown")) {
		vscode.window.showInformationMessage("You can now use ctrl+' to maximize the terminal. This behaviour can be reconfigured in settings.",
		 "Go to settings").then(selection => {
			context.globalState.update("informationMessageShown", true);
			if (selection === "Go to settings") {
				vscode.commands.executeCommand( 'workbench.action.openSettings', 'maximizeterminal.useAlternativeKeybinding' );
			}
		 });
	}

	let maxTerm = vscode.commands.registerCommand('maximizeterminal.maxTerm', () => {

		// these commands are necessary to get the orange focus outline to appear in the right place

		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");

		//vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");

		vscode.commands.executeCommand("workbench.panel.terminal.focus");
		vscode.commands.executeCommand("workbench.action.focusPanel");
		vscode.commands.executeCommand("workbench.action.terminal.focus");

		//let config = vscode.workspace.getConfiguration('maximizeterminal');

		//vscode.window.showInformationMessage("informationMessageShown: " + context.globalState.get("informationMessageShown"));
	});

	context.subscriptions.push(maxTerm);
}

// executed on deactivation of the extension
export function deactivate() {}