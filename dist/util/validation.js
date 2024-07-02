"use strict";
// src/util/validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCardinalDirection = isValidCardinalDirection;
exports.isValidTurningDirection = isValidTurningDirection;
exports.areValidCoordinates = areValidCoordinates;
exports.isValidCommandString = isValidCommandString;
exports.isValidTestData = isValidTestData;
const CardinalDirections = [
    "NORTH",
    "EAST",
    "SOUTH",
    "WEST",
];
const TurningDirections = ["LEFT", "RIGHT"];
const CommandTypes = [
    "PLACE",
    "MOVE",
    "LEFT",
    "RIGHT",
    "REPORT",
    "EXIT",
    "HELP"
];
function isValidCardinalDirection(direction) {
    return CardinalDirections.includes(direction);
}
function isValidTurningDirection(direction) {
    return TurningDirections.includes(direction);
}
function isValidCommandType(command) {
    return CommandTypes.includes(command);
}
function isValidInteger(value) {
    if (typeof value === "number")
        return Number.isInteger(value);
    return Number.isInteger(parseInt(value));
}
;
function areValidCoordinates(coordinates) {
    return (coordinates.x !== undefined &&
        coordinates.y !== undefined &&
        isValidInteger(coordinates.x) &&
        isValidInteger(coordinates.y) &&
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
function isValidTestData(data) {
    if (!Array.isArray(data))
        return false;
    return data.every((testCase) => {
        if (!testCase.description || !testCase.commands)
            return false;
        return testCase.commands.every((command) => isValidCommandString(command.raw));
    });
}
;
