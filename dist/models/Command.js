"use strict";
// src/commands/Command.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCommand = exports.TurnCommand = exports.MoveCommand = exports.PlaceCommand = void 0;
const validation_1 = require("../util/validation");
class PlaceCommand {
    constructor(placement) {
        this.placement = placement;
    }
    execute(robot, table) {
        if (table.isValidPlacement(this.placement)) {
            robot.place(this.placement);
        }
    }
}
exports.PlaceCommand = PlaceCommand;
class MoveCommand {
    execute(robot, table) {
        const nextPlacement = robot.getMoveDestination();
        if (!nextPlacement || !table.isValidPlacement(nextPlacement))
            return;
        robot.move();
    }
}
exports.MoveCommand = MoveCommand;
class TurnCommand {
    constructor(turnDirection) {
        this.turnDirection = turnDirection;
    }
    ;
    execute(robot, table) {
        if ((0, validation_1.isValidTurningDirection)(this.turnDirection)) {
            robot.turn(this.turnDirection);
        }
    }
}
exports.TurnCommand = TurnCommand;
class ReportCommand {
    execute(robot, table) {
        robot.report();
    }
}
exports.ReportCommand = ReportCommand;
