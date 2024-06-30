// src/index.ts
import { CommandProcessor } from './services/CommandProcessor';
import { Robot } from './models/Robot';
import { Table } from './models/Table';
import type { TestDataType } from './types/Types';
import * as fs from "fs";
import * as path from "path";

const table = new Table(5, 5);
const robot = new Robot();
const commandProcessor = new CommandProcessor(table, robot);

function processCommandsFromFile(filePath: string) {
  fs.readFile(filePath, "utf-8", (error, data) => {
    if (error) {
      console.error(`Error reading file: ${error}`);
      return;
    }

    console.clear();
    console.log("Automated robot simulation started.");

    try {
      const testCases = JSON.parse(data);
      testCases.forEach((testCase: TestDataType) => {
				commandProcessor.resetSimulation();
				console.log(`Test Case: ${testCase.description}`);
        testCase.commands.forEach((command) => {
          console.log("> " + command);
          commandProcessor.process(command);
        });
        console.log(""); // Add a newline for readability between test cases
      });
    } catch (parseError) {
      console.error(`Error parsing JSON data: ${parseError}`);
    }

    console.log("Robot simulation complete.");
		process.exit();
  });
}

const args = process.argv.slice(2);
if (args.length > 0) {
	const filePath = path.resolve(args[0]);
	processCommandsFromFile(filePath);
} else {
	process.stdin.on('data', (data) => {
		const commandString = data.toString().trim();

		if (commandString === 'EXIT') {
			console.log("Robot simulation ended.");
			process.exit();
		}

		commandProcessor.process(commandString);
		process.stdout.write("\n> ");
	});

	console.clear();
  console.log("Robot simulation started.");
  console.log("Type 'EXIT' to quit, and 'HELP' for commands.");
  process.stdout.write("\n> ");
}

process.stdin.on('data', (data) => {
	const commandString = data.toString().trim();

	if (commandString === 'EXIT') {
		console.log("Robot simulation ended.");
		process.exit();
	} else if (commandString === 'HELP') {
		printHelp();
	} else {
		commandProcessor.process(commandString);
	}
	process.stdout.write("\n> ");
});

function printHelp() {
	console.log("\nValid commands:");
	console.log("\tPLACE X,Y,F - Places the robot at (X,Y) facing F (NORTH/SOUTH/EAST/WEST)");
	console.log("\tMOVE - Moves the robot forward");
	console.log("\tLEFT - Turns the robot to the left");
	console.log("\tRIGHT - Turns the robot to the right");
	console.log("\tREPORT - Outputs robot's current position & direction");
	console.log("\tEXIT - Ends the simulation");
	console.log("\tHELP - View this guide");
};
