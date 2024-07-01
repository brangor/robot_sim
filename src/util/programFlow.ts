// src/util/programFlow.ts

import type { CommandProcessor } from '../services/CommandProcessor';
import { printEndSession, printHelp, printOutputQueue } from './IO';
import { CommandInputType } from '../types/Types';

export function endSession() {
	process.exit();
};

export function processCommands(commands: CommandInputType[], commandProcessor: CommandProcessor) {
	commands.forEach(command => {
		if (command.command === 'EXIT') {
			printEndSession();
			endSession();
		} else if (command.command === 'HELP') {
			printHelp();
		} else {
			commandProcessor.process(command);
			printOutputQueue(commandProcessor);
		}
	});
}
