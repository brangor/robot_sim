"use strict";
// src/util/lookups.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveOffsetLookup = void 0;
// Offsets based on the SW corner of the table being (0,0),
// 	thus NORTH is +y, EAST is +x, SOUTH is -y, WEST is -x
exports.MoveOffsetLookup = {
    NORTH: { x: 0, y: 1 },
    EAST: { x: 1, y: 0 },
    SOUTH: { x: 0, y: -1 },
    WEST: { x: -1, y: 0 }
};
