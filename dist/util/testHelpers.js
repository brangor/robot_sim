"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCommandStrings = processCommandStrings;
const helpers_1 = require("./helpers");
async function processCommandStrings(commandProcessor, commandStrings) {
    commandStrings.map(async (commandString) => {
        const command = (0, helpers_1.getCommandFromInputString)(commandString);
        if (command) {
            await commandProcessor.process(command);
        }
    });
}
