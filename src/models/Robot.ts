// src/models/Robot.ts

import type {
  Coordinate,
  CardinalDirection,
  TurningDirection,
  PlacementType,
  MessageType
} from "../types/Types";
import { addCoordinates } from "../util/helpers";
import { TurningLookup, MoveOffsetLookup } from "../util/lookups";
import {
  isValidCardinalDirection,
  isValidTableCoordinate,
  isValidTurningDirection,
} from "../util/validation";
import {
  createInfoMessage,
  createErrorMessage,
  createDebugMessage
} from "../util/message";

export class Robot {
  private coordinate: Coordinate = { x: undefined, y: undefined };
  private facing: CardinalDirection | undefined = undefined;
  private isPlaced: boolean = false;
  private messageQueue: MessageType[] = [];

  // Getter methods
  public getCoordinates(): Coordinate {
    return this.coordinate;
  }

  public getFacing(): CardinalDirection | undefined {
    return this.facing;
  }

  public getPlacement(): PlacementType {
    return {
      coordinates: this.coordinate,
      direction: this.facing,
    };
  }

  public isOnTable(): boolean {
    return this.isPlaced;
  }

  // Message queue methods
  public dumpMessageQueue(): MessageType[] {
    const queue = this.messageQueue;
    this.messageQueue = [];
    return queue;
  }

  private addMessage(message: MessageType): void {
    this.messageQueue.push(message);
  }

  // Validation method
  private hasValidPosition(): boolean {
    return (
      this.isPlaced &&
      !!this.coordinate &&
      !!this.facing &&
      isValidTableCoordinate(this.coordinate) &&
      isValidCardinalDirection(this.facing)
    );
  }

  // Calculate next move destination
  public getMoveDestination(): Coordinate {
    if (!this.hasValidPosition()) return { x: undefined, y: undefined };

    const offset = MoveOffsetLookup[this.facing!];
    return addCoordinates(this.coordinate, offset);
  }

  // Reset robot state
  public reset(): void {
    this.isPlaced = false;
    this.coordinate = { x: undefined, y: undefined };
    this.facing = undefined;
  }

  // Place the robot
  public place(placement: PlacementType): void {
    if (
      !isValidCardinalDirection(placement.direction) ||
      !isValidTableCoordinate(placement.coordinates)
    ) {
      this.addMessage(createErrorMessage("Invalid placement."));
      return;
    }

    this.coordinate = placement.coordinates;
    this.facing = placement.direction;
    this.isPlaced = true;

    const message = `Robot placed at: ${placement.coordinates.x},${placement.coordinates.y}, facing ${placement.direction}`;
    this.addMessage(createDebugMessage(message));
  }

  // Report robot's position
  public report(): void {
    if (!this.hasValidPosition()) return;

    const report = `${this.coordinate.x},${this.coordinate.y},${this.facing}`;
    this.addMessage(createInfoMessage(report));
  }

  // Move the robot
  public move(): void {
    if (!this.hasValidPosition()) return;

    const nextMoveCoordinates = this.getMoveDestination();
    if (!isValidTableCoordinate(nextMoveCoordinates)) {
      this.addMessage(
        createDebugMessage("Move ignored. Robot would fall off the table.")
      );
      return;
    }

    const message = `Robot moved to: ${this.coordinate.x},${this.coordinate.y}`;
    this.coordinate = nextMoveCoordinates;

    this.addMessage(createDebugMessage(message));
  }

  // Turn the robot
  public turn(turnDirection: TurningDirection): void {
    if (!this.hasValidPosition()) return;
    if (!isValidTurningDirection(turnDirection)) return;

    this.facing = TurningLookup[this.facing!][turnDirection];
    this.addMessage(createDebugMessage(`Robot turned to: ${this.facing}`));
  }
}
