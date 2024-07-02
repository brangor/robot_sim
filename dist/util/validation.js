"use strict";
// src/util/validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCardinalDirection = isValidCardinalDirection;
exports.isValidTurningDirection = isValidTurningDirection;
exports.areValidCoordinates = areValidCoordinates;
exports.isValidCommandString = isValidCommandString;
function isValidCardinalDirection(direction) {
    const CardinalDirections = [
        "NORTH",
        "EAST",
        "SOUTH",
        "WEST",
    ];
    return CardinalDirections.includes(direction);
}
function isValidTurningDirection(direction) {
    const TurningDirections = ["LEFT", "RIGHT"];
    return TurningDirections.includes(direction);
}
function isValidCommandType(command) {
    const CommandTypes = [
        "PLACE",
        "MOVE",
        "LEFT",
        "RIGHT",
        "REPORT",
        "EXIT",
        "HELP",
    ];
    return CommandTypes.includes(command);
}
function areValidCoordinates(coordinates) {
    return (coordinates.x !== undefined &&
        coordinates.y !== undefined &&
        Number.isInteger(coordinates.x) &&
        Number.isInteger(coordinates.y) &&
        coordinates.x >= 0 &&
        coordinates.y >= 0);
}
function isValidPlacementString(value) {
    if (!value.includes(",") || value.split(",").length !== 3)
        return false;
    const parts = value.split(",").map((part) => part.trim());
    const coordinates = {
        x: parseInt(parts[0]),
        y: parseInt(parts[1]),
    };
    const direction = parts[2];
    return areValidCoordinates(coordinates) && isValidCardinalDirection(direction);
}
;
function isValidCommandString(value) {
    let parts = [];
    if (!value)
        return false;
    if (value.includes(" ")) {
        parts = value.split(" ");
    }
    else {
        parts.push(value);
    }
    if (!isValidCommandType(parts[0]))
        return false;
    if (parts.length === 1)
        return true;
    if (parts.length === 2)
        return parts[0] === "PLACE" && isValidPlacementString(parts[1]);
    return false;
}
