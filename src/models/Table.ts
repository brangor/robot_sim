// src/models/Table.ts

import type { Placement } from "../types/Types";
import {
  areValidCoordinates,
  isValidCardinalDirection,
} from "../util/validation";

function validatePlacement(
  placement: Placement,
  maxHeight: number = Infinity,
  maxWidth: number = Infinity
): boolean {
  if (maxWidth < 0 || maxHeight < 0) return false;

  const { coordinates, direction } = placement;

  return (
    isValidCardinalDirection(direction) &&
    areValidCoordinates(coordinates) &&
    coordinates.x! < maxWidth &&
    coordinates.y! < maxHeight
  );
}
export class Table {
  constructor(private height: number, private width: number) {}

  public isValidPlacement(place: Placement): boolean {
    return validatePlacement(place, this.height, this.width);
  }

	getHeight(): number {
		return this.height;
	}

  getWidth(): number {
    return this.width;
  }
}
