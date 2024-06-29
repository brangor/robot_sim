// src/__tests__/Robot.test.ts

import { Robot } from "../models/Robot";
import { Table } from "../models/Table";

describe('Robot', () => {
  let table: Table;
	let robot: Robot;

  beforeEach(() => {
		robot = new Robot();
    table = new Table(5, 5);
  });

	test("should not be able to move before being placed", () => {
		robot.move(table);

		expect(robot.report()).toBe("Robot is not yet placed on a table");
	});

	test("should not turn left before being placed", () => {
		robot.turn("LEFT");

		expect(robot.report()).toBe("Robot is not yet placed on a table");
	});

	test("should not turn right before being placed", () => {
		robot.turn("RIGHT");

		expect(robot.report()).toBe("Robot is not yet placed on a table");
	});

	test('should be placeable', () => {
		robot.place({ x: 2, y: 2 }, "NORTH");

		expect(robot.isOnTable(table)).toBe(true);
		expect(robot.report()).toBe("2,2,NORTH");
	});

	describe('after being placed', () => {
		beforeEach(() => {
			robot.place({ x: 2, y: 2 }, "NORTH");
		});

		test('should be moveable', () => {
			robot.move(table);

			expect(robot.report()).toBe('2,3,NORTH');
		});

		test('should be able to turn left', () => {
			robot.turn("LEFT");

			expect(robot.report()).toBe('2,2,WEST');
		});

		test('should be able to turn right', () => {
			robot.turn("RIGHT");

			expect(robot.report()).toBe('2,2,EAST');
		});

		test('should be able to move in all directions', () => {
			robot.move(table);

			expect(robot.report()).toBe('2,3,NORTH');

			robot.turn("LEFT");
			robot.move(table);

			expect(robot.report()).toBe('1,3,WEST');

			robot.turn("LEFT");
			robot.move(table);

			expect(robot.report()).toBe('1,2,SOUTH');

			robot.turn("LEFT");
			robot.move(table);

			expect(robot.report()).toBe('2,2,EAST');
		});

		test("should not be able to move off the table", () => {
			robot.move(table); // to 2,3
			robot.move(table); // to 2,4
			robot.move(table); // to 2,5 (invalid, past the edge)

			expect(robot.report()).toBe("2,4,NORTH");
		});

		test("should not be able to be placed again", () => {
			robot.place({ x: 3, y: 3 }, "SOUTH");

			expect(robot.report()).toBe("2,2,NORTH");
		});

	});

	describe("should successfully follow example instructions", () => {
		test("should correctly handle example 1", () => {
			robot.place({ x: 0, y: 0 }, "NORTH");
			robot.move(table);

			expect(robot.report()).toBe("0,1,NORTH");
		});

		test("should correctly handle example 2", () => {
			robot.place({ x: 0, y: 0 }, "NORTH");
			robot.turn("LEFT");

			expect(robot.report()).toBe("0,0,WEST");
		});

		test("should correctly handle example 3", () => {
      robot.place({ x: 1, y: 2 }, "EAST");
      robot.move(table);
      robot.move(table);
      robot.turn("LEFT");
      robot.move(table);

      expect(robot.report()).toBe("3,3,NORTH");
    });
	});
});
