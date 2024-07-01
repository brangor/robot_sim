// src/__tests__/unit/Robot.test.ts

import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";

function getLastMessage(robot: Robot): string | undefined {
	const messages = robot.dumpMessageQueue();
	if (messages.length === 0) {
		return undefined;
	}
	return messages[messages.length - 1].message;
}

describe('Robot', () => {
  let table: Table;
	let robot: Robot;

  beforeEach(() => {
		robot = new Robot();
    table = new Table(5, 5);
  });

	test("should not be able to move before being placed", () => {
		robot.move();

		robot.report();

		expect(getLastMessage(robot)).toBe(undefined);
	});

	test("should not turn left before being placed", () => {
		robot.turn("LEFT");

		robot.report();
		expect(getLastMessage(robot)).toBe(undefined);
	});

	test("should not turn right before being placed", () => {
		robot.turn("RIGHT");

		robot.report();
		expect(getLastMessage(robot)).toBe(undefined);
	});

	test('should be placeable', () => {
		robot.place({ coordinates: { x: 2, y: 2 }, direction: "NORTH" });
		robot.report();
		expect(getLastMessage(robot)).toBe("2,2,NORTH");
	});

	describe('after being placed', () => {
		beforeEach(() => {
			robot.place({coordinates: { x: 2, y: 2 }, direction: "NORTH" });
		});

		test('should be moveable', () => {
			robot.move();

			robot.report();
			expect(getLastMessage(robot)).toBe('2,3,NORTH');
		});

		test('should be able to turn left', () => {
			robot.turn("LEFT");

			robot.report();
			expect(getLastMessage(robot)).toBe('2,2,WEST');
		});

		test('should be able to turn right', () => {
			robot.turn("RIGHT");

			robot.report();
			expect(getLastMessage(robot)).toBe('2,2,EAST');
		});

		test('should be able to move in all directions', () => {
			robot.move();

			robot.report();

			expect(getLastMessage(robot)).toBe("2,3,NORTH");

			robot.turn("LEFT");
			robot.move();

			robot.report();
			expect(getLastMessage(robot)).toBe('1,3,WEST');

			robot.turn("LEFT");
			robot.move();

			robot.report();
			expect(getLastMessage(robot)).toBe('1,2,SOUTH');

			robot.turn("LEFT");
			robot.move();

			robot.report();
			expect(getLastMessage(robot)).toBe('2,2,EAST');
		});
	});
});
