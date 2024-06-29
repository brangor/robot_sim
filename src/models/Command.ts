// src/commands/Command.ts

import { Robot } from '../models/Robot';
import { Table } from '../models/Table';

import type { Coordinate, CardinalDirection, TurningDirection } from '../types/Types';

export interface Command {
	execute(robot: Robot, table: Table): void;
}

export class PlaceCommand implements Command {
	output = null;

  constructor(
    private coordinate: Coordinate,
    private direction: CardinalDirection
  ) {}

	validateCommand(robot: Robot, table: Table): boolean {
		return table.isValidPosition(this.coordinate) &&
			!robot.isOnTable(table); // can't place a placed robot!
	}

  execute(robot: Robot, table: Table): void {
		if (this.validateCommand(robot, table)) {
			robot.place(this.coordinate, this.direction);
		}
  }
}

export class MoveCommand implements Command {
  validateCommand(robot: Robot, table: Table): boolean {
    return robot.isOnTable(table) && table.isValidPosition(robot.calculateNextMoveCoordinates());
  }

  execute(robot: Robot, table: Table): void {
    if (this.validateCommand(robot, table)) {
      robot.move(table);
    }
  }
}

export class TurnCommand implements Command {
	constructor(private turnDirection: TurningDirection) {};

	validateCommand(robot: Robot, table: Table): boolean {
		return robot.isOnTable(table);
	};

	execute(robot: Robot, table: Table): void {
		if (this.validateCommand(robot, table)) {
			robot.turn(this.turnDirection);
		}
	}
}

export class ReportCommand implements Command {
	execute(robot: Robot, table: Table): void {
		const output: string | void = robot.report();

		if (output) {
			console.log("Output: " + output);
		}
	}
}
