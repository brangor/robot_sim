// src/models/Table.ts

import type { Coordinate } from "../types/Types";
import { isValidTableCoordinate } from "../util/validation";

export class Table {
  constructor(private height: number, private width: number) {}

  isValidPosition(c: Coordinate): boolean {
    return isValidTableCoordinate(c, this.height, this.width);
  }

	getHeight(): number {
		return this.height;
	}

  getWidth(): number {
    return this.width;
  }
}
