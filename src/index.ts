// src/index.ts

import { CommandProcessor } from "./services/CommandProcessor";
import { MessageSystem } from "./services/MessageSystem";
import { Robot } from "./models/Robot";
import { Table } from "./models/Table";
import { retrieveCommandsFromFile, getPathFromArgs } from "./util/fileUtil";
import {
  sendMessage,
  printInputPrompt,
  printFatalError,
  printUnknownFatalError,
  printStartSession,
  printStartTestGroup,
  printEndTestSession,
  printHelp,
  printInvalidCommandMessage,
} from "./util/IO";
import { getCommandFromInputString } from "./util/helpers";
import { endSession, processCommands } from "./util/programFlow";
import type { CommandInputList } from "./types/Types";

const tableDimensions: [number, number] = [5, 5];
const table = new Table(...tableDimensions);
const robot = new Robot();
const messageSystem = new MessageSystem();
const commandProcessor = new CommandProcessor(table, robot, messageSystem);

async function main() {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    let path: string | undefined;
    let commandInputList: CommandInputList[] | undefined;

    try {
      path = getPathFromArgs(args);
      commandInputList = retrieveCommandsFromFile(path);
    } catch (error: unknown) {
      if (error instanceof Error) {
        await printFatalError(error.message);
      } else {
        await printUnknownFatalError();
      }
      endSession();
    }

    if (commandInputList && commandInputList.length > 0) {
      let successfulRuns = 0;
      for (const commandInput of commandInputList) {
        commandProcessor.resetSimulation();
        await printStartTestGroup(commandInput.description);
        for (const command of commandInput.commands) {
          printInputPrompt(command.raw);
          await commandProcessor.process(command);
        }
        const lastSentMessage = messageSystem.getLatestSentMessage();
        const matchesExpectation =
        lastSentMessage === commandInput.expectedOutput ||
        (!lastSentMessage && !commandInput.expectedOutput);
        if (matchesExpectation) successfulRuns++;
        await sendMessage(
          `\nTest condition looks ${matchesExpectation ? "good! ✓" : "wrong! ✗"}\n`
        );
      }
      await printEndTestSession(successfulRuns, commandInputList.length);
    } else {
      await printFatalError("No test cases found in file.");
      endSession();
    }

  } else {
    process.stdin.on("data", async (data) => {
      const input = data.toString().trim().toUpperCase();

      const command = getCommandFromInputString(input);

      if (command) {
        if (command.command === "EXIT") {
          endSession();
        } else if (command.command === "HELP") {
          printHelp();
        }

        await processCommands([command], commandProcessor);
        await printInputPrompt();
      } else {
        printInvalidCommandMessage();
      }

    });
    await printStartSession(...tableDimensions);
  }
}

main();
