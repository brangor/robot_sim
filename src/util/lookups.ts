// src/util/lookups.ts

import type {
  CardinalDirection,
  Coordinates,
  TurningDirection,
} from "../types/Types";

// Offsets based on the SW corner of the table being (0,0),
// 	thus NORTH is +y, EAST is +x, SOUTH is -y, WEST is -x
export const MoveOffsetLookup: { [key in CardinalDirection]: Coordinates } = {
	NORTH: { x: 0, y: 1 },
	EAST: { x: 1, y: 0 },
	SOUTH: { x: 0, y: -1 },
	WEST: { x: -1, y: 0 }
};

export const TurningLookup: {
  [key in CardinalDirection]: { [key in TurningDirection]: CardinalDirection };
} = {
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
