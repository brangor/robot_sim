// src/models/Robot.ts

import { Table } from './Table';
import type {
  Coordinate,
  CardinalDirection,
	TurningDirection
} from "../types/Types";
import { TurningLookup, MoveOffsetLookup, addCoordinates } from "../util/helpers";

const CardinalDirections: CardinalDirection[] = ["NORTH", "EAST", "SOUTH", "WEST"];

export class Robot {
  private coordinate: Coordinate = {
    x: 0,
    y: 0,
  };
  private facing: CardinalDirection = "NORTH";
  private isPlaced: boolean = false;

  public calculateNextMoveCoordinates = (): Coordinate => {
		// Grab offset from helper file lookup, based on current facing direction
		const offset = MoveOffsetLookup[this.facing];
		// Add it to current position to see where move would take us
    return addCoordinates(this.coordinate, offset);
  };

  public isOnTable(table: Table): boolean {
    return this.isPlaced && table.isValidPosition(this.coordinate);
  }

  place(coordinate: Coordinate, direction: CardinalDirection): void {
    if (this.isPlaced) {
      return;
    }

    if (!CardinalDirections.includes(direction)) {
      return;
    }

    if (coordinate.x < 0 || coordinate.y < 0) {
      return;
    }

    if (coordinate.x >= 5 || coordinate.y >= 5) {
      return;
    }

    this.coordinate = {
      x: coordinate.x,
      y: coordinate.y,
    };

    this.facing = direction;

    this.isPlaced = true;
  }

  report(): string | void {
    if (!this.isPlaced) {
      return;
    }
    return `${this.coordinate.x},${this.coordinate.y},${this.facing}`;
  }

  move(table: Table): void {
    if (!this.isPlaced) return;

    const nextMoveCoordinates = this.calculateNextMoveCoordinates();

    if (table.isValidPosition(nextMoveCoordinates)) {
      this.coordinate = nextMoveCoordinates;
    }
  }

	turn(turnDirection: TurningDirection): void {
		if (!this.isPlaced) return;

    this.facing = TurningLookup[this.facing][turnDirection];
	}
}
