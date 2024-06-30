// src/services/CommandProcessor.ts

import { Command, PlaceCommand, MoveCommand, TurnCommand, ReportCommand } from "../models/Command";
import { Robot } from "../models/Robot";
import { Table } from "../models/Table";
import { isValidCardinalDirection } from "../util/validation";

import type {
  Coordinate,
  CardinalDirection,
  TurningDirection
} from "../types/Types";
export class CommandProcessor {
  private robot: Robot;
  private table: Table;
  private commandInputQueue: string[] = [];

  constructor(table: Table, robot: Robot) {
    this.robot = robot;
    this.table = table;
  }

  process(commandInputString: string): void {
    this.commandInputQueue.push(commandInputString);
    if (this.commandInputQueue.length === 1) {
      this.processNextCommand();
    }
  }

  private processNextCommand(): void {
    if (this.commandInputQueue.length === 0) return;

    const commandInputString = this.commandInputQueue.shift();
    if (!commandInputString) return;

    const parts = commandInputString.trim().split(" ");
    const commandType = parts[0];

    let command: Command | null = null;

    switch (commandType) {
      case "PLACE":
        if (parts.length === 2) {
          const [x, y, direction] = parts[1].split(",");
          if (
            this.isValidInteger(x) && this.isValidInteger(y) &&
            isValidCardinalDirection(direction)
          ) {
            command = new PlaceCommand(
              { x: parseInt(x), y: parseInt(y) } as Coordinate,
              direction as CardinalDirection
            );
          }
        }
        break;
      case "MOVE":
        command = new MoveCommand();
        break;
      case "LEFT":
        command = new TurnCommand("LEFT" as TurningDirection);
        break;
      case "RIGHT":
        command = new TurnCommand("RIGHT" as TurningDirection);
        break;
      case "REPORT":
        command = new ReportCommand();
        break;
    }

    if (command) {
      command.execute(this.robot, this.table);
    }

    setTimeout(() => this.processNextCommand(), 100);
  }

  public resetSimulation(): void {
    this.robot.removeFromTable();
  }

  private isValidInteger(s: string): boolean {
    return !isNaN(parseInt(s));
  }
}
