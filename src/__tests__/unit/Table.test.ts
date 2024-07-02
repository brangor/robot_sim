// src/__tests__/unit/Table.test.ts

import { Table } from "../../models/Table";
import type { Placement, Coordinates, CardinalDirection } from "../../types/Types";

const place = (c: Coordinates, d: CardinalDirection) => ({coordinates: c, direction: d} as Placement);

const validPlacements: Placement[] = [
  place({ x: 0, y: 0 }, "NORTH"),
  place({ x: 4, y: 4 }, "SOUTH"),
  place({ x: 2, y: 3 }, "EAST"),
  place({ x: 3, y: 1 }, "WEST"),
];

const invalidPlacements: Placement[] = [
  place({ x: -1, y: 0 }, "NORTH"),
  place({ x: 0, y: -1 }, "SOUTH"),
  place({ x: 5, y: 5 }, "EAST"),
  place({ x: 6, y: 3 }, "WEST"),
];


describe("Table", () => {
  let table: Table;

  beforeEach(() => {
    table = new Table(5, 5);
  });

  test("should return true for valid positions", () => {
    validPlacements.forEach((placement) => {
      expect(table.isValidPlacement(placement)).toBe(true);
    });
  });

  test("should return false for invalid positions", () => {
    invalidPlacements.forEach((placement) => {
      expect(table.isValidPlacement(placement)).toBe(false);
    });
  });
});
