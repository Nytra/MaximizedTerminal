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

	let maxTerm = vscode.commands.registerCommand('maximizeterminal.openMaximizedTerminal', () => {

		vscode.commands.executeCommand("workbench.action.togglePanel");
		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");

		//vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");

		// broken. possibly deprecated?
		//vscode.commands.executeCommand("workbench.panel.terminal.focus"); 

		//vscode.commands.executeCommand("workbench.action.focusPanel");
		//vscode.commands.executeCommand("workbench.action.terminal.focus");

		vscode.commands.executeCommand("terminal.focus");

		//let config = vscode.workspace.getConfiguration('maximizeterminal');
		//vscode.commands.getCommands().then(onfulfilled => {console.log(onfulfilled);});
		
		//vscode.window.showInformationMessage("maxTerm called");
	});

	let minTerm = vscode.commands.registerCommand('maximizeterminal.openMinimizedTerminal', () => {

		vscode.commands.executeCommand("workbench.action.togglePanel");
		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");

		vscode.commands.executeCommand("terminal.focus");

		//vscode.window.showInformationMessage("minTerm called");
	});

	context.subscriptions.push(maxTerm);
	context.subscriptions.push(minTerm);
}

// executed on deactivation of the extension
export function deactivate() {}