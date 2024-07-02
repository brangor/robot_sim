"use strict";
// src/models/Robot.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const helpers_1 = require("../util/helpers");
const lookups_1 = require("../util/lookups");
const TurningLookup = {
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
class Robot {
    constructor() {
        this.coordinates = undefined;
        this.facing = undefined;
        this.isPlaced = false;
        this.messageQueue = [];
    }
    getPlacement() {
        if (!this.isPlaced || !this.coordinates || !this.facing)
            return undefined;
        return {
            coordinates: this.coordinates,
            direction: this.facing,
        };
    }
    // Calculate next move destination
    getMoveDestination() {
        if (!this.hasValidPosition())
            return null;
        const nextMoveCoordinates = (0, helpers_1.addCoordinates)(this.coordinates, lookups_1.MoveOffsetLookup[this.facing]);
        return {
            coordinates: nextMoveCoordinates,
            direction: this.facing,
        };
    }
    // Reset robot state
    reset() {
        this.isPlaced = false;
        this.coordinates = undefined;
        this.facing = undefined;
        this.messageQueue = [];
    }
    place(placement) {
        this.coordinates = placement.coordinates;
        this.facing = placement.direction;
        this.isPlaced = true;
    }
    report() {
        if (!this.hasValidPosition())
            return;
        const report = `Output: ${this.coordinates.x},${this.coordinates.y},${this.facing}`;
        this.addMessage(report);
    }
    move() {
        if (!this.hasValidPosition())
            return;
        const nextMovePlacement = this.getMoveDestination();
        if (!nextMovePlacement)
            return;
        this.coordinates = nextMovePlacement.coordinates;
    }
    turn(turnDirection) {
        if (!this.hasValidPosition())
            return;
        this.facing = TurningLookup[this.facing][turnDirection];
    }
    // Message queue methods
    dumpMessageQueue() {
        const queue = this.messageQueue;
        this.messageQueue = [];
        return queue;
    }
    addMessage(message) {
        this.messageQueue.push(message);
    }
    hasValidPosition() {
        return (this.isPlaced &&
            this.coordinates !== undefined &&
            this.facing !== undefined);
    }
}
exports.Robot = Robot;
