// src/models/Robot.ts

import type {
  Coordinate,
  CardinalDirection,
  TurningDirection,
} from "../types/Types";
import {
  TurningLookup,
  MoveOffsetLookup,
  addCoordinates
} from "../util/helpers";
import {
  isValidCardinalDirection,
  isValidTableCoordinate,
  isValidTurningDirection
} from "../util/validation";

export class Robot {
  private coordinate: Coordinate = { x: undefined, y: undefined };
  private facing: CardinalDirection | undefined = undefined;
  private isPlaced: boolean = false;

  public calculateNextMoveCoordinates(): Coordinate {
    if (!this.hasValidPosition()) return { x: undefined, y: undefined };

    const offset = MoveOffsetLookup[this.facing!];
    return addCoordinates(this.coordinate, offset);
  }

  public hasValidPosition(): boolean {
    return (
      this.isPlaced &&
      isValidTableCoordinate(this.coordinate) &&
      isValidCardinalDirection(this.facing)
    );
  }

  public getPosition(): Coordinate {
    return this.coordinate;
  }

  public getFacing(): CardinalDirection | undefined {
    return this.facing;
  }

  public isOnTable(): boolean {
    return this.isPlaced;
  }

  public removeFromTable(): void {
    this.isPlaced = false;
    this.coordinate = { x: undefined, y: undefined };
    this.facing = undefined;
  }

  public place(coordinate: Coordinate, direction: CardinalDirection): void {
    if (!isValidCardinalDirection(direction) || !isValidTableCoordinate(coordinate)) return;

    this.coordinate = { x: coordinate.x, y: coordinate.y };
    this.facing = direction;
    this.isPlaced = true;
  }

  public report(): string | void {
    if (!this.hasValidPosition()) return;

    return `${this.coordinate.x},${this.coordinate.y},${this.facing}`;
  }

  public move(): Coordinate | void {
    if (!this.hasValidPosition()) return;

    this.coordinate = this.calculateNextMoveCoordinates();
  }

  public turn(turnDirection: TurningDirection): void {
    if (!this.hasValidPosition()) return;
    if (!isValidTurningDirection(turnDirection)) return;

    this.facing = TurningLookup[this.facing!][turnDirection];
  }
}
