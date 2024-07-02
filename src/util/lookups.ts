// src/util/lookups.ts

import type { CardinalDirection, TurningDirection, Coordinates } from "../types/Types";

// Offsets based on the SW corner of the table being (0,0),
// 	thus NORTH is +y, EAST is +x, SOUTH is -y, WEST is -x
export const MoveOffsetLookup: { [key in CardinalDirection]: Coordinates } = {
	NORTH: { x: 0, y: 1 },
	EAST: { x: 1, y: 0 },
	SOUTH: { x: 0, y: -1 },
	WEST: { x: -1, y: 0 }
};
