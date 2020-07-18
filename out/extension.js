"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    // show message on first activation of the extension
    vscode.window.showInformationMessage("You can now use ctrl+' to open the maximized terminal :)");
    let maxTerm = vscode.commands.registerCommand('maximizeterminal.maxTerm', () => {
        // these commands are necessary to get the orange focus outline to appear in the right place
        vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
        // we don't use the toggleTerminal command, because it doesn't work the way we want
        //vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
        vscode.commands.executeCommand("workbench.panel.terminal.focus");
        vscode.commands.executeCommand("workbench.action.focusPanel");
        vscode.commands.executeCommand("workbench.action.terminal.focus");
    });
    context.subscriptions.push(maxTerm);
}
exports.activate = activate;
// executed on deactivation of the extension
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map