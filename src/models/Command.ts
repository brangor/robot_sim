// src/commands/Command.ts

import { Robot } from '../models/Robot';
import { Table } from '../models/Table';

import type {
  PlacementType,
  CardinalDirection,
  TurningDirection,
} from "../types/Types";
export interface Command {
	execute(robot: Robot, table: Table): void;
}

export class PlaceCommand implements Command {
  constructor(
    private placement: PlacementType
  ) {}

  execute(robot: Robot, table: Table): void {
		if (table.isValidPosition(this.placement.coordinates)) {
      robot.place(this.placement);
    }
  }
}

export class MoveCommand implements Command {
  execute(robot: Robot, table: Table): void {
    if (table.isValidPosition(robot.getMoveDestination())) {
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
	execute(robot: Robot, table: Table): string | void {
		robot.report();
	}
}
