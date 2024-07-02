"use strict";
// src/util/programFlow.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.processCommands = processCommands;
exports.endSession = endSession;
const IO_1 = require("./IO");
async function processCommands(commands, commandProcessor) {
    for (const command of commands) {
        await commandProcessor.process(command);
    }
}
function endSession() {
    (0, IO_1.printEndSession)();
    process.exit();
}
