// src/commands/Command.ts

import { Robot } from '../models/Robot';
import { Table } from '../models/Table';

import type { Placement, TurningDirection } from "../types/Types";
import { isValidTurningDirection } from '../util/validation';
export interface Command {
	execute(robot: Robot, table: Table): void;
}

export class PlaceCommand implements Command {
  constructor(private placement: Placement) {}

  execute(robot: Robot, table: Table): void {
    if (table.isValidPlacement(this.placement)) {
      robot.place(this.placement);
    }
  }
}

export class MoveCommand implements Command {
  execute(robot: Robot, table: Table): void {
    const nextPlacement = robot.getMoveDestination();

    if (!nextPlacement || !table.isValidPlacement(nextPlacement)) return;

    robot.move();
  }
}

export class TurnCommand implements Command {
  constructor(private turnDirection: TurningDirection) {}
  execute(robot: Robot, table: Table): void {
    if (isValidTurningDirection(this.turnDirection)) {
      robot.turn(this.turnDirection);
    }
  }
}

export class ReportCommand implements Command {
	execute(robot: Robot, table: Table): void {
		robot.report();
	}
}
