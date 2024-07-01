// src/__tests__/unit/Robot.test.ts

import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";

describe('Robot', () => {
  let table: Table;
	let robot: Robot;

  beforeEach(() => {
		robot = new Robot();
    table = new Table(5, 5);
  });

	test("should not be able to move before being placed", () => {
		robot.move();

		expect(robot.report()).toBe(undefined)
	});

	test("should not turn left before being placed", () => {
		robot.turn("LEFT");

		expect(robot.report()).toBe(undefined)
	});

	test("should not turn right before being placed", () => {
		robot.turn("RIGHT");

		expect(robot.report()).toBe(undefined)
	});

	test('should be placeable', () => {
		robot.place({ x: 2, y: 2 }, "NORTH");

		expect(table.isValidPosition(robot.getPosition())).toBe(true);
		expect(robot.report()).toBe("2,2,NORTH");
	});

	describe('after being placed', () => {
		beforeEach(() => {
			robot.place({ x: 2, y: 2 }, "NORTH");
		});

		test('should be moveable', () => {
			robot.move();

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
			robot.move();

			expect(robot.report()).toBe('2,3,NORTH');

			robot.turn("LEFT");
			robot.move();

			expect(robot.report()).toBe('1,3,WEST');

			robot.turn("LEFT");
			robot.move();

			expect(robot.report()).toBe('1,2,SOUTH');

			robot.turn("LEFT");
			robot.move();

			expect(robot.report()).toBe('2,2,EAST');
		});
	});
});
