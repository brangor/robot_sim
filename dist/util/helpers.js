"use strict";
// src/helpers.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCoordinates = addCoordinates;
exports.getCommandFromInputString = getCommandFromInputString;
exports.getPlacementFromArg = getPlacementFromArg;
const validation_1 = require("./validation");
function addCoordinates(a, b) {
    return {
        x: (a.x ?? 0) + (b.x ?? 0),
        y: (a.y ?? 0) + (b.y ?? 0),
    };
}
function getCommandFromInputString(command) {
    let parts;
    if (!command || !(0, validation_1.isValidCommandString)(command))
        return undefined;
    if (command.includes(" ")) {
        parts = command.split(" ");
    }
    else {
        parts = [command];
    }
    return {
        command: parts[0],
        placement: parts[1] ? getPlacementFromArg(parts[1]) : null,
        raw: command,
    };
}
function getPlacementFromArg(arg) {
    if (!arg || !arg.includes(","))
        return null;
    const parts = arg.split(",");
    if (parts.length !== 3)
        return null;
    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);
    const dir = parts[2];
    if (isNaN(x) || isNaN(y) || !dir)
        return null;
    return {
        coordinates: { x, y },
        direction: dir,
    };
}
