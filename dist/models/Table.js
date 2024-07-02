"use strict";
// src/models/Table.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const validation_1 = require("../util/validation");
function validatePlacement(placement, maxHeight = Infinity, maxWidth = Infinity) {
    if (maxWidth < 0 || maxHeight < 0)
        return false;
    const { coordinates, direction } = placement;
    return ((0, validation_1.isValidCardinalDirection)(direction) &&
        (0, validation_1.areValidCoordinates)(coordinates) &&
        coordinates.x < maxWidth &&
        coordinates.y < maxHeight);
}
class Table {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    isValidPlacement(place) {
        return validatePlacement(place, this.height, this.width);
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
}
exports.Table = Table;
