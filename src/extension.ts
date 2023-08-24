import { exec } from 'child_process';
import * as vscode from 'vscode';

//let test = vscode.commands.registerCommand('maximizeterminal.test', () => {
	//console.log("side panel function");
	//vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
//});

export async function activate(context: vscode.ExtensionContext) {

	//vscode.commands.executeCommand("maximizeterminal.test");
	
	// === this line resets the key, for debugging the first install message ===
	//context.globalState.update("informationMessageShown", false);
	// ===

	//vscode.window.showInformationMessage("owo");

	// display information message on first install
	if (!context.globalState.get("informationMessageShown")) {
		vscode.window.showInformationMessage("You can now use ctrl+' to maximize the terminal. This behaviour can be reconfigured in settings.",
		 "Go to settings").then(selection => {
			// on selection, set key "informationMessageShown" to true (so that the message doesn't get shown again)
			context.globalState.update("informationMessageShown", true);
			if (selection === "Go to settings") {
				vscode.commands.executeCommand( 'workbench.action.openSettings', 'maximizeterminal.useAlternativeKeybinding' );
			}
		 });
	}

	// toggles the maximized terminal
	let maxTerm = vscode.commands.registerCommand('maximizeterminal.openMaximizedTerminal', () => {
		
		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
		//vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
		vscode.commands.executeCommand("workbench.action.terminal.focus");
		

		// === BROKEN ===
		// call this to stop the terminal from moving the input line to the bottom when pressing a key after going from minimized to maximized state
		//vscode.commands.executeCommand("panel.focusPanel");
		// ===

		//vscode.window.showInformationMessage("openMaximizedTerminal was called");
  	});

  	// Added in PR #4
	// Closes the maximized terminal
  	let closeMaxTerm = vscode.commands.registerCommand('maximizeterminal.closeMaximizedTerminal', () => {

		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
		vscode.commands.executeCommand("workbench.action.closePanel");

		//vscode.window.showInformationMessage("closeMaximizedTerminal was called");
	});

	// Opens minimized terminal
	let minTerm = vscode.commands.registerCommand('maximizeterminal.openMinimizedTerminal', () => {

		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
		vscode.commands.executeCommand("workbench.action.terminal.focus");
		//vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");

		// === BROKEN ===
		// call this to stop the terminal from moving the input line to the bottom when pressing a key after going from minimized to maximized state
		//vscode.commands.executeCommand("panel.focusPanel");
		// ===

		//vscode.window.showInformationMessage("openMinimizedTerminal was called");
	});

	context.subscriptions.push(maxTerm);
	context.subscriptions.push(closeMaxTerm);
	context.subscriptions.push(minTerm);
	//context.subscriptions.push(test);
}

export function deactivate() {}