import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "maximizedterminal" is now active!');

	let maxTerm = vscode.commands.registerCommand('maximizedterminal.maxTerm', () => {
		// these commands are necessary to get the orange focus outline to appear in the right place
		vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
		vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
		vscode.commands.executeCommand("workbench.action.focusPanel");
		vscode.commands.executeCommand("workbench.action.terminal.focus");
	});

	context.subscriptions.push(maxTerm);
}

// this method is called when your extension is deactivated
export function deactivate() {}
