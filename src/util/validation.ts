// src/util/validation.ts

import type { Coordinates, TurningDirection, CardinalDirection, CommandAction } from "../types/Types";

export function isValidCardinalDirection(direction: string): boolean {
	const CardinalDirections: CardinalDirection[] = [
		"NORTH",
		"EAST",
		"SOUTH",
		"WEST",
	];
  return CardinalDirections.includes(direction as CardinalDirection);
}

export function isValidTurningDirection(direction: TurningDirection | undefined): boolean {
	const TurningDirections: TurningDirection[] = ["LEFT", "RIGHT"];
	return TurningDirections.includes(direction as TurningDirection);
}

function isValidCommandType(command: string): boolean {
	const CommandTypes: CommandAction[] = [
    "PLACE",
    "MOVE",
    "LEFT",
    "RIGHT",
    "REPORT",
    "EXIT",
    "HELP",
  ];
	return CommandTypes.includes(command as CommandAction);
}

export function areValidCoordinates(coordinates: Coordinates): boolean {
	return (
		coordinates.x !== undefined &&
		coordinates.y !== undefined &&
		Number.isInteger(coordinates.x) &&
		Number.isInteger(coordinates.y) &&
		coordinates.x >= 0 &&
		coordinates.y >= 0
	);
}

function isValidPlacementString(value: string): boolean {
	if (!value.includes(",") || value.split(",").length !== 3) return false;

	const parts = value.split(",").map((part) => part.trim());

	const coordinates = {
		x: parseInt(parts[0]),
		y: parseInt(parts[1]),
	};
	const direction = parts[2];

	return areValidCoordinates(coordinates) && isValidCardinalDirection(direction);
};

export function isValidCommandString(value: string): boolean {
	let parts: string[] = [];
  if (!value) return false;

  if (value.includes(" ")) {
    parts = value.split(" ");
  } else {
    parts.push(value);
  }
  if (!isValidCommandType(parts[0])) return false;
  if (parts.length === 1) return true;
  if (parts.length === 2)
    return parts[0] === "PLACE" && isValidPlacementString(parts[1]);
  return false;
}
