// src/index.ts
import { CommandProcessor } from './services/CommandProcessor';
import { Robot } from './models/Robot';
import { Table } from './models/Table';

const table = new Table(5, 5);
const robot = new Robot();
const commandProcessor = new CommandProcessor(table, robot);

process.stdin.on('data', (data) => {
	const commandString = data.toString().trim();
	commandProcessor.process(commandString);
});

console.log("Robot simulation started. Enter commands:");
