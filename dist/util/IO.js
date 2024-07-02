"use strict";
// src/util/IO.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.printStartSession = printStartSession;
exports.printEndSession = printEndSession;
exports.printEndTest = printEndTest;
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
const DIVIDER = "-".repeat(40) + "\n";
async function sendMessage(message) {
    await messageSystem.enqueueMessage(message);
}
async function printMessages(messages) {
    await Promise.all(messages.map(sendMessage));
}
// Session related functions
async function printStartSession(tableHeight, tableWidth) {
    console.clear();
    await printMessages([
        "Robot simulation started.\n",
        DIVIDER,
        `Table dimensions: ${tableHeight} x ${tableWidth}\n`,
        "Type 'EXIT' to quit, and 'HELP' for commands.\n",
        DIVIDER,
    ]);
    await printInputPrompt();
}
async function printEndSession() {
    await printMessages(["Robot simulation ended.\n", DIVIDER]);
}
async function printEndTest(wasSuccessful) {
    await printMessages([
        `\nTest condition looks ${wasSuccessful ? "good! ✓" : "wrong! ✗"}\n`
    ]);
}
// Test session related functions
async function printEndTestSession(successes, totalTests) {
    await sendMessage(`${successes} out of ${totalTests} test cases successful.\n`);
}
async function printStartTestGroup(description) {
    await printMessages([DIVIDER, `Test Case: ${description}\n`]);
}
async function printEndTestGroup(description) {
    await printMessages([`End Test Case: ${description}\n`, DIVIDER]);
}
// Command and error related functions
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
    await printMessages([
        "\nValid commands:\n",
        ...commandList.map((cmd) => `\t${cmd}\n`),
    ]);
}
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
