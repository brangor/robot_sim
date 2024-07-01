// src/index.ts
import { CommandProcessor } from './services/CommandProcessor';
import { MessageSystem } from './services/MessageSystem';
import { Robot } from './models/Robot';
import { Table } from './models/Table';
import { retrieveCommandsFromFile, getPathFromArgs } from './util/fileUtil';
import {
  printInputPrompt,
	printFatalError,
  printStartSession,
  printStartTestSession,
  printTestSessionInput,
  printEndSession,
  printHelp,
  printInvalidCommandMessage,
} from "./util/IO";
import { isValidCommandString } from './util/validation';
import { getCommandFromInputString } from "./util/helpers";
import { endSession, processCommands } from './util/programFlow';
import { CommandInputType } from './types/Types';

const table = new Table(5, 5);
const robot = new Robot();
const messageSystem = new MessageSystem();
const commandProcessor = new CommandProcessor(table, robot, messageSystem);

async function main() {
	const args = process.argv.slice(2);

	if (args.length > 0) {
		const path = getPathFromArgs(args);
		if (path) {
			const testCases = retrieveCommandsFromFile(path);
			if (Array.isArray(testCases) && testCases.length > 0) {
				testCases.forEach(testCase => {
					commandProcessor.resetSimulation();
					printStartTestSession(testCase.description);
					processCommands(testCase.commands, commandProcessor);
				});
			} else {
				printFatalError("No test cases found in file.");
				endSession();
			}
		} else {
			printFatalError("Invalid file path.");
			endSession();
		}
	} else {
		process.stdin.on('data', (data) => {
			let commandString = getCommandFromInputString(data.toString().trim());
			processCommands([commandString], commandProcessor);
			printInputPrompt();
		});
		printStartSession(table.getHeight(), table.getWidth());
	}
}

main();
