// src/util/validation.ts

import type { Coordinate, TurningDirection, CardinalDirection, CommandType } from "../types/Types";

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
];

// Function to check if a number is an integer and optionally within a range
export function isValidTableCoordinate(coordinate: Coordinate, maxWidth: number = Infinity, maxHeight: number = Infinity): boolean {

	return (
		(coordinate.x !== undefined && coordinate.y !== undefined) &&
		(Number.isInteger(coordinate.x) && Number.isInteger(coordinate.y)) &&
		(coordinate.x! >= 0 && coordinate.x! < maxWidth) &&
		(coordinate.y! >= 0 && coordinate.y! < maxHeight)
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
