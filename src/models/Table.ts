// src/models/Table.ts

import type { Coordinate } from "../types/Types";

export class Table {
  constructor(private height: number, private width: number) {}

  isValidPosition(c: Coordinate): boolean {
    return c.y >= 0 && c.y < this.height && c.x >= 0 && c.x < this.width;
  }

	getHeight(): number {
		return this.height;
	}

  getWidth(): number {
    return this.width;
  }
}
