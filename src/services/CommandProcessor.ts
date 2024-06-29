// src/services/CommandProcessor.ts

import { Command, PlaceCommand, MoveCommand, TurnCommand, ReportCommand } from "../models/Command";
import { Robot } from "../models/Robot";
import { Table } from "../models/Table";

import type {
  Coordinate,
  CardinalDirection,
  TurningDirection,
  CommandType,
} from "../types/Types";

export class CommandProcessor {
	private robot: Robot;
	private table: Table;

	constructor(table: Table, robot: Robot) {
		this.robot = robot;
		this.table = table;
	}

	process(commandString: string): void {
		const parts = commandString.split(' ');
		const commandType = parts[0];

		let command: Command | null = null;

		switch (commandType) {
			case 'PLACE':
				const [x, y, direction] = parts[1].split(',');
				command = new PlaceCommand({x: parseInt(x), y: parseInt(y)} as Coordinate, direction as CardinalDirection);
				break;
			case 'MOVE':
				command = new MoveCommand();
				break;
			case 'LEFT':
				command = new TurnCommand("LEFT" as TurningDirection);
				break;
			case 'RIGHT':
				command = new TurnCommand("RIGHT" as TurningDirection);
				break;
			case 'REPORT':
				command = new ReportCommand();
				break;
		}

		if (command) {
			command.execute(this.robot, this.table);
		}
	}
}

