"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    //console.log('Congratulations, your extension "maximizeterminal" is now active!');
    let maxTerm = vscode.commands.registerCommand('maximizeterminal.maxTerm', () => {
        // these commands are necessary to get the orange focus outline to appear in the right place
        vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
        //vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
        vscode.commands.executeCommand("workbench.panel.terminal.focus");
        vscode.commands.executeCommand("workbench.action.focusPanel");
        vscode.commands.executeCommand("workbench.action.terminal.focus");
    });
    context.subscriptions.push(maxTerm);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map