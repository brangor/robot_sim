// src/__tests__/unit/Table.test.ts

import { Table } from "../../models/Table";

describe("Table", () => {
  let table: Table;

  beforeEach(() => {
    table = new Table(5, 5);
  });

  test("should return true for valid positions", () => {
    expect(table.isValidPosition({x: 0, y: 0})).toBe(true);
    expect(table.isValidPosition({x: 4, y: 4})).toBe(true);
    expect(table.isValidPosition({x: 2, y: 3})).toBe(true);
  });

  test("should return false for invalid positions", () => {
    expect(table.isValidPosition({x: -1, y: 0})).toBe(false);
    expect(table.isValidPosition({x: 0, y: -1})).toBe(false);
    expect(table.isValidPosition({x: 5, y: 5})).toBe(false);
    expect(table.isValidPosition({x: 6, y: 3})).toBe(false);
  });
});
