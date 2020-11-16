"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        // show message on first activation of the extension
        //context.globalState.update("informationMessageShown", false);
        if (!context.globalState.get("informationMessageShown")) {
            vscode.window.showInformationMessage("You can now use ctrl+' to maximize the terminal. This behaviour can be reconfigured in settings.", "Go to settings").then(selection => {
                context.globalState.update("informationMessageShown", true);
                if (selection === "Go to settings") {
                    vscode.commands.executeCommand('workbench.action.openSettings', 'maximizeterminal.useAlternativeKeybinding');
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
    });
}
exports.activate = activate;
// executed on deactivation of the extension
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map