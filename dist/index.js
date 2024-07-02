"use strict";
// src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
const CommandProcessor_1 = require("./services/CommandProcessor");
const MessageSystem_1 = require("./services/MessageSystem");
const Robot_1 = require("./models/Robot");
const Table_1 = require("./models/Table");
const fileUtil_1 = require("./util/fileUtil");
const IO_1 = require("./util/IO");
const helpers_1 = require("./util/helpers");
const programFlow_1 = require("./util/programFlow");
const tableDimensions = [5, 5];
const table = new Table_1.Table(...tableDimensions);
const robot = new Robot_1.Robot();
const messageSystem = new MessageSystem_1.MessageSystem();
const commandProcessor = new CommandProcessor_1.CommandProcessor(table, robot, messageSystem);
async function main() {
    const args = process.argv.slice(2);
    if (args.length > 0) {
        let path;
        let commandInputList;
        try {
            path = (0, fileUtil_1.getPathFromArgs)(args);
            commandInputList = (0, fileUtil_1.retrieveCommandsFromFile)(path);
        }
        catch (error) {
            if (error instanceof Error) {
                await (0, IO_1.printFatalError)(error.message);
            }
            else {
                await (0, IO_1.printUnknownFatalError)();
            }
            (0, programFlow_1.endSession)();
        }
        if (commandInputList && commandInputList.length > 0) {
            let successfulRuns = 0;
            for (const commandInput of commandInputList) {
                commandProcessor.resetSimulation();
                await (0, IO_1.printStartTestGroup)(commandInput.description);
                for (const command of commandInput.commands) {
                    (0, IO_1.printInputPrompt)(command.raw);
                    await commandProcessor.process(command);
                }
                const lastSentMessage = messageSystem.getLatestSentMessage();
                const matchesExpectation = lastSentMessage === commandInput.expectedOutput ||
                    (!lastSentMessage && !commandInput.expectedOutput);
                if (matchesExpectation)
                    successfulRuns++;
                await (0, IO_1.sendMessage)(`\nTest condition looks ${matchesExpectation ? "good! ✓" : "wrong! ✗"}\n`);
            }
            await (0, IO_1.printEndTestSession)(successfulRuns, commandInputList.length);
        }
        else {
            await (0, IO_1.printFatalError)("No test cases found in file.");
            (0, programFlow_1.endSession)();
        }
    }
    else {
        process.stdin.on("data", async (data) => {
            const input = data.toString().trim().toUpperCase();
            const command = (0, helpers_1.getCommandFromInputString)(input);
            if (command) {
                if (command.command === "EXIT") {
                    (0, programFlow_1.endSession)();
                }
                else if (command.command === "HELP") {
                    (0, IO_1.printHelp)();
                }
                await (0, programFlow_1.processCommands)([command], commandProcessor);
                await (0, IO_1.printInputPrompt)();
            }
            else {
                (0, IO_1.printInvalidCommandMessage)();
            }
        });
        await (0, IO_1.printStartSession)(...tableDimensions);
    }
}
main();
