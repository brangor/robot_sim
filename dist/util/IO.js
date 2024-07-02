"use strict";
// src/util/IO.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
exports.printStartSession = printStartSession;
exports.printEndSession = printEndSession;
exports.printEndTestSession = printEndTestSession;
exports.printStartTestGroup = printStartTestGroup;
exports.printEndTestGroup = printEndTestGroup;
exports.printHelp = printHelp;
exports.printInvalidCommandMessage = printInvalidCommandMessage;
exports.printInputPrompt = printInputPrompt;
exports.printReportMessage = printReportMessage;
exports.printFatalError = printFatalError;
exports.printUnknownFatalError = printUnknownFatalError;
const MessageSystem_1 = require("../services/MessageSystem");
const messageSystem = new MessageSystem_1.MessageSystem();
async function printDivider() {
    await sendMessage("-".repeat(40) + "\n");
}
async function sendMessage(message) {
    messageSystem.enqueueMessage(message);
}
async function printStartSession(tableHeight, tableWidth) {
    console.clear();
    await sendMessage("Robot simulation started.\n");
    await printDivider();
    await sendMessage(`Table dimensions: ${tableHeight} x ${tableWidth}\n`);
    await sendMessage("Type 'EXIT' to quit, and 'HELP' for commands.\n");
    await printDivider();
    await printInputPrompt();
}
async function printEndSession() {
    await sendMessage("Robot simulation ended.\n");
    await printDivider();
}
async function printEndTestSession(succeses, totalTests) {
    await sendMessage(`${succeses} out of ${totalTests} test cases successful.\n`);
}
async function printStartTestGroup(description) {
    await printDivider();
    await sendMessage(`Test Case: ${description}\n`);
}
async function printEndTestGroup(description) {
    await sendMessage(`End Test Case: ${description}\n`);
    await printDivider();
}
async function printHelp() {
    const commandList = [
        "PLACE X,Y,F - Places the robot at X,Y (coordinate pair), facing F (NORTH/SOUTH/EAST/WEST)",
        "MOVE - Moves the robot forward",
        "LEFT - Turns the robot to the left",
        "RIGHT - Turns the robot to the right",
        "REPORT - Outputs robot's current position & direction",
        "EXIT - Ends the simulation",
        "HELP - View this guide",
    ];
    await sendMessage("\nValid commands:\n");
    commandList.forEach(async (command) => await sendMessage(`\t${command}\n`));
}
;
async function printInvalidCommandMessage() {
    await sendMessage("Invalid command. Type 'HELP' for commands.\n");
}
async function printInputPrompt(input = "") {
    await sendMessage(`\n > ${input}`);
}
async function printReportMessage(x, y, direction) {
    await sendMessage(`Robot is at: ${x},${y}, facing ${direction}\n`);
}
async function printFatalError(message) {
    await sendMessage(`Fatal error: ${message}\n`);
}
async function printUnknownFatalError() {
    await sendMessage("Fatal error occurred.\n");
}
