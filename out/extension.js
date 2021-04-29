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
        // show interactive message on first activation of the extension
        // === for debugging ===
        //context.globalState.update("informationMessageShown", false);
        // ===
        // display information message if context's globalstate has key "informationMessageShown" with value: false
        if (!context.globalState.get("informationMessageShown")) {
            vscode.window.showInformationMessage("You can now use ctrl+' to maximize the terminal. This behaviour can be reconfigured in settings.", "Go to settings").then(selection => {
                // on selection resolution, set key "informationMessageShown" to value: true (so that the message doesn't get shown again)
                context.globalState.update("informationMessageShown", true);
                if (selection === "Go to settings") {
                    // go to settings
                    vscode.commands.executeCommand('workbench.action.openSettings', 'maximizeterminal.useAlternativeKeybinding');
                }
            });
        }
        // register command to maximize the terminal, store its disposable in a local variable (for subscribing to it later)
        let maxTerm = vscode.commands.registerCommand('maximizeterminal.openMaximizedTerminal', () => {
            // sequence of commands to maximize the terminal.
            //vscode.commands.executeCommand("workbench.action.togglePanel");
            vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
            // not working..
            //vscode.commands.executeCommand("terminal.focus");
            vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
            // === BROKEN ===
            // call this to stop the terminal from moving the input line to the bottom when pressing a key after going from minimized to maximized state
            //vscode.commands.executeCommand("panel.focusPanel");
            // ===
            //let config = vscode.workspace.getConfiguration('maximizeterminal');
            // output all api commands to console
            //vscode.commands.getCommands().then(onfulfilled => {console.log(onfulfilled);});
            vscode.window.showInformationMessage("maxTerm called");
        });
        // Added in Pull-Request #4
        let closeMaxTerm = vscode.commands.registerCommand('maximizeterminal.closeMaximizedTerminal', () => {
            vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
            vscode.commands.executeCommand("workbench.action.closePanel");
            vscode.window.showInformationMessage("closeMaxTerm called");
        });
        let minTerm = vscode.commands.registerCommand('maximizeterminal.openMinimizedTerminal', () => {
            // sequence of commands to open a minimized terminal..
            //vscode.commands.executeCommand("workbench.action.togglePanel");
            vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
            vscode.commands.executeCommand("workbench.action.toggleMaximizedPanel");
            //vscode.commands.executeCommand("terminal.focus");
            vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
            // === BROKEN ===
            // call this to stop the terminal from moving the input line to the bottom when pressing a key after going from minimized to maximized state
            //vscode.commands.executeCommand("panel.focusPanel");
            // ===
            vscode.window.showInformationMessage("minTerm called");
        });
        // subscribe to the disposables for the functions above. when the extension deactivates, these functions will be unregistered.
        context.subscriptions.push(maxTerm);
        context.subscriptions.push(closeMaxTerm);
        context.subscriptions.push(minTerm);
    });
}
exports.activate = activate;
// executed on deactivation of the extension
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map