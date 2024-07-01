// src/util/IO.ts

import type { CommandProcessor } from '../services/CommandProcessor';
import type { MessageType } from '../types/Types';

export function printStartSession(tableHeight: number, tableWidth: number) {
	console.clear();
	process.stdout.write("Robot simulation started.");
	process.stdout.write(`Table dimensions: ${tableHeight} x ${tableWidth}`);
	process.stdout.write("Type 'EXIT' to quit, and 'HELP' for commands.");
	process.stdout.write("\n> ");
}

export function printEndSession() {
	process.stdout.write("Robot simulation ended.");
	process.exit();
}

export function printStartTestSession(description: string) {
	process.stdout.write(`Test Case: ${description}`);
}

export function printTestSessionInput(command: string) {
  process.stdout.write(`> ${command}`);
}

export function printHelp() {
	const commandList = [
		"PLACE X,Y,F - Places the robot at X,Y (coordinate pair), facing F (NORTH/SOUTH/EAST/WEST)",
		"MOVE - Moves the robot forward",
		"LEFT - Turns the robot to the left",
		"RIGHT - Turns the robot to the right",
		"REPORT - Outputs robot's current position & direction",
		"EXIT - Ends the simulation",
		"HELP - View this guide",
	];

	process.stdout.write("\nValid commands:");
	commandList.forEach((command) => process.stdout.write(`\t${command}`));
};

export function printInvalidCommandMessage() {
	process.stdout.write("Invalid command. Type 'HELP' for commands.");
}

export function printInputPrompt() {
  process.stdout.write("\n> ");
}

export function printReportMessage(x: number, y: number, direction: string) {
	process.stdout.write(`Robot is at: ${x},${y}, facing ${direction}`);
}

export function printFatalError(message: string) {
	process.stdout.write(`Fatal error: ${message}`);
	process.exit(1);
}

export function printOutputQueue(commandProcessor: CommandProcessor) {
  const outputs: MessageType[] = commandProcessor.getAllOutputs();
  outputs.forEach((output) => {
    process.stdout.write(output.message + "\n");
  });
}
