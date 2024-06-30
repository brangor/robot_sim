// src/helpers.ts

import type { Coordinate, CardinalDirection, TurningDirection } from "../types/Types";

// these lookups seemed easier to understand/maintain than angles or switch case statements

export const TurningLookup: { [key in CardinalDirection]: { [key in TurningDirection]: CardinalDirection }} = {
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

// Offsets based on the SW corner of the table being (0,0),
// 	thus NORTH is +y, EAST is +x, SOUTH is -y, WEST is -x
export const MoveOffsetLookup: { [key in CardinalDirection]: Coordinate } = {
	NORTH: { x: 0, y: 1 },
	EAST: { x: 1, y: 0 },
	SOUTH: { x: 0, y: -1 },
	WEST: { x: -1, y: 0 }
};

export function addCoordinates(
  a: Coordinate,
  b: Coordinate
): Coordinate {

	return {
    x: (a.x ?? 0) + (b.x ?? 0),
    y: (a.y ?? 0) + (b.y ?? 0)
  };
}
