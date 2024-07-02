// src/util/IO.ts

import { MessageSystem } from '../services/MessageSystem';

const messageSystem = new MessageSystem();

async function printDivider() {
	await sendMessage("-".repeat(40)+"\n");
}

export async function sendMessage(message: string) {
	messageSystem.enqueueMessage(message);
}

export async function printStartSession(tableHeight: number, tableWidth: number) {
	console.clear();
	await sendMessage("Robot simulation started.\n");
	await printDivider();
	await sendMessage(`Table dimensions: ${tableHeight} x ${tableWidth}\n`);
	await sendMessage("Type 'EXIT' to quit, and 'HELP' for commands.\n");
	await printDivider();
	await printInputPrompt()
}

export async function printEndSession() {
	await sendMessage("Robot simulation ended.\n");
	await printDivider();
}

export async function printEndTestSession(succeses: number, totalTests: number) {
	await sendMessage(`${succeses} out of ${totalTests} test cases successful.\n`);
}

export async function printStartTestGroup(description: string) {
	await printDivider();
	await sendMessage(`Test Case: ${description}\n`);
}

export async function printEndTestGroup(description: string) {
	await sendMessage(`End Test Case: ${description}\n`);
	await printDivider();
}

export async function printHelp() {
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
};

export async function printInvalidCommandMessage() {
	await sendMessage("Invalid command. Type 'HELP' for commands.\n");
}

export async function printInputPrompt(input: string = "") {
  await sendMessage(`\n > ${input}`);
}

export async function printReportMessage(x: number, y: number, direction: string) {
	await sendMessage(`Robot is at: ${x},${y}, facing ${direction}\n`);
}

export async function printFatalError(message: string) {
	await sendMessage(`Fatal error: ${message}\n`);
}

export async function printUnknownFatalError() {
	await sendMessage("Fatal error occurred.\n");
}
