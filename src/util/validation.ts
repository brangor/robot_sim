// src/util/validation.ts

import { Command } from "../models/Command";

import type { Coordinate, TurningDirection, CardinalDirection, CommandType, TestDataType, CommandInputType } from "../types/Types";

const CardinalDirections: CardinalDirection[] = [
  "NORTH",
  "EAST",
  "SOUTH",
  "WEST",
];
const TurningDirections: TurningDirection[] = ["LEFT", "RIGHT"];

const CommandTypes: CommandType[] = [
	"PLACE",
	"MOVE",
	"LEFT",
	"RIGHT",
	"REPORT",
	"EXIT",
	"HELP"
];

// Function to check if a number is an integer and optionally within a range
export function isValidTableCoordinate(coordinate: Coordinate, maxWidth: number = Infinity, maxHeight: number = Infinity): boolean {
	if (maxWidth < 0 || maxHeight < 0) return false;
	if (coordinate === undefined || coordinate.x === undefined || coordinate.y === undefined) return false;

	return (
		(Number.isInteger(coordinate.x) && Number.isInteger(coordinate.y)) &&
		(coordinate.x >= 0 && coordinate.x < maxWidth) &&
		(coordinate.y >= 0 && coordinate.y < maxHeight)
	);
}

export function isValidCardinalDirection(direction: string | undefined): boolean {
  return CardinalDirections.includes(direction as CardinalDirection);
}

export function isValidTurningDirection(direction: TurningDirection | undefined): boolean {
	return TurningDirections.includes(direction as TurningDirection);
}

export function isValidCommandType(commandType: CommandType | undefined): boolean {
	return CommandTypes.includes(commandType as CommandType);
}

function isValidInteger(value: string): boolean {
	return Number.isInteger(parseInt(value));
};

function isValidCoordinateString(value: string): boolean {
	const parts = value.split(",");
	if (parts.length !== 3) return false;
	if (!isValidInteger(parts[0]) || !isValidInteger(parts[1])) return false;
	return isValidCardinalDirection(parts[2]);
};

export function isValidCommandString(value: string): boolean {
	const parts = value.split(" ");
	if (!isValidCommandType(parts[0] as CommandType)) return false;
	if (parts.length === 1) return true;
	if (parts.length === 2) return (parts[0] === "PLACE") && isValidCoordinateString(parts[1]);
	return false;
};

export function isValidTestData(data: TestDataType[]): boolean {
	if (!Array.isArray(data)) return false;
	return data.every((testCase) => {
		if (!testCase.description || !testCase.commands) return false;
		return testCase.commands.every((command) => isValidCommandString(command.raw));
	});
};
