// src/util/IO.ts

import { MessageSystem } from "../services/MessageSystem";

const messageSystem = new MessageSystem();

const DIVIDER = "-".repeat(40) + "\n";

async function sendMessage(message: string) {
  await messageSystem.enqueueMessage(message);
}

async function printMessages(messages: string[]) {
  await Promise.all(messages.map(sendMessage));
}

// Session related functions
export async function printStartSession(
  tableHeight: number,
  tableWidth: number
) {
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

export async function printEndSession() {
  await printMessages(["Robot simulation ended.\n", DIVIDER]);
}

export async function printEndTest(wasSuccessful: boolean) {
	await printMessages([
		`\nTest condition looks ${wasSuccessful ? "good! ✓" : "wrong! ✗"}\n`
	]);
}

// Test session related functions
export async function printEndTestSession(
  successes: number,
  totalTests: number
) {
  await sendMessage(
    `${successes} out of ${totalTests} test cases successful.\n`
  );
}

export async function printStartTestGroup(description: string) {
  await printMessages([DIVIDER, `Test Case: ${description}\n`]);
}

export async function printEndTestGroup(description: string) {
  await printMessages([`End Test Case: ${description}\n`, DIVIDER]);
}

// Command and error related functions
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

  await printMessages([
    "\nValid commands:\n",
    ...commandList.map((cmd) => `\t${cmd}\n`),
  ]);
}

export async function printInvalidCommandMessage() {
  await sendMessage("Invalid command. Type 'HELP' for commands.\n");
}

export async function printInputPrompt(input: string = "") {
  await sendMessage(`\n > ${input}`);
}

export async function printReportMessage(
  x: number,
  y: number,
  direction: string
) {
  await sendMessage(`Robot is at: ${x},${y}, facing ${direction}\n`);
}

export async function printFatalError(message: string) {
  await sendMessage(`Fatal error: ${message}\n`);
}

export async function printUnknownFatalError() {
  await sendMessage("Fatal error occurred.\n");
}
