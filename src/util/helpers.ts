// src/helpers.ts

import type { Coordinate, CommandType, CommandInputType, PlacementType, CardinalDirection } from "../types/Types";

export function addCoordinates(
  a: Coordinate,
  b: Coordinate
): Coordinate {

	return {
    x: (a.x ?? 0) + (b.x ?? 0),
    y: (a.y ?? 0) + (b.y ?? 0)
  };
}

export function getCommandFromInputString(command: string): CommandInputType {
  const parts = command.trim().split(" ");
  return {
    command: parts[0] as CommandType,
    arg: parts[1] ?? undefined,
    raw: command
  };
}

export function getPlacementFromArg(arg: string): PlacementType {
  const parts = arg.split(",");
  return {
    coordinates: {
      x: parseInt(parts[0]),
      y: parseInt(parts[1]),
    },
    direction: parts[2] as CardinalDirection
  };
}

