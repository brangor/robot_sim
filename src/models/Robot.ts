// src/models/Robot.ts

import type {
  Coordinates as Coordinates,
  CardinalDirection,
  TurningDirection,
  Placement
} from "../types/Types";
import { addCoordinates } from "../util/helpers";
import { MoveOffsetLookup } from "../util/lookups";

const TurningLookup: {
  [key in CardinalDirection]: { [key in TurningDirection]: CardinalDirection };
} = {
  NORTH: {
    LEFT: "WEST",
    RIGHT: "EAST",
  },
  EAST: {
    LEFT: "NORTH",
    RIGHT: "SOUTH",
  },
  SOUTH: {
    LEFT: "EAST",
    RIGHT: "WEST",
  },
  WEST: {
    LEFT: "SOUTH",
    RIGHT: "NORTH",
  },
};

export class Robot {
  private coordinates: Coordinates | undefined = undefined;
  private facing: CardinalDirection | undefined = undefined;
  private isPlaced: boolean = false;
  private messageQueue: string[] = [];

  public getPlacement(): Placement | undefined {
    if (!this.isPlaced || !this.coordinates || !this.facing) return undefined;
    return {
      coordinates: this.coordinates,
      direction: this.facing,
    };
  }

  // Calculate next move destination
  public getMoveDestination(): Placement | null {
    if (!this.hasValidPosition()) return null;

    const nextMoveCoordinates = addCoordinates(
      this.coordinates!,
      MoveOffsetLookup[this.facing!]
    );

    return {
      coordinates: nextMoveCoordinates,
      direction: this.facing!,
    };
  }

  // Reset robot state
  public reset(): void {
    this.isPlaced = false;
    this.coordinates = undefined;
    this.facing = undefined;
    this.messageQueue = [];
  }

  public place(placement: Placement): void {
    this.coordinates = placement.coordinates;
    this.facing = placement.direction;
    this.isPlaced = true;
  }

  public report(): void {
    if (!this.hasValidPosition()) return;

    const report = `Output: ${this.coordinates!.x},${this.coordinates!.y},${this.facing!}`;
    this.addMessage(report);
  }

  public move(): void {
    if (!this.hasValidPosition()) return;
    const nextMovePlacement = this.getMoveDestination();
    if (!nextMovePlacement) return;

    this.coordinates = nextMovePlacement.coordinates;
  }

  public turn(turnDirection: TurningDirection): void {
    if (!this.hasValidPosition()) return;
    this.facing = TurningLookup[this.facing!][turnDirection];
  }

  // Message queue methods
  public dumpMessageQueue(): string[] {
    const queue = this.messageQueue;
    this.messageQueue = [];
    return queue;
  }

  private addMessage(message: string): void {
    this.messageQueue.push(message);
  }

  private hasValidPosition(): boolean {
    return (
      this.isPlaced &&
      this.coordinates !== undefined &&
      this.facing !== undefined
    );
  }
}
