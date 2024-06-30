// src/commands/Command.ts

import { Robot } from '../models/Robot';
import { Table } from '../models/Table';

import type { Coordinate, CardinalDirection, TurningDirection } from '../types/Types';
import { isValidTableCoordinate, isValidCardinalDirection, isValidTurningDirection } from '../util/validation';
export interface Command {
	execute(robot: Robot, table: Table): void;
}

export class PlaceCommand implements Command {
  constructor(
    private coordinate: Coordinate,
    private direction: CardinalDirection
  ) {}

  execute(robot: Robot, table: Table): void {
		if (table.isValidPosition(this.coordinate)) {
			robot.place(this.coordinate, this.direction);
		}
  }
}

export class MoveCommand implements Command {
  execute(robot: Robot, table: Table): void {
		const nextMoveCoordinates = robot.calculateNextMoveCoordinates();
    if (table.isValidPosition(nextMoveCoordinates)) {
      robot.move();
    }
  }
}

export class TurnCommand implements Command {
	constructor(private turnDirection: TurningDirection) {};

	execute(robot: Robot, table: Table): void {
		robot.turn(this.turnDirection);
	}
}

export class ReportCommand implements Command {
	execute(robot: Robot, table: Table): void {
		const output = robot.report();

		if (output) {
			console.log(`Output: ${output}`);
		}
	}
}
