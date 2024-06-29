// src/__tests__/unit/Command.test.ts

import { PlaceCommand, MoveCommand, TurnCommand, ReportCommand } from "../../models/Command";
import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";

describe("Commands", () => {
	let robot: Robot;
	let table: Table;

	beforeEach(() => {
		robot = new Robot();
		table = new Table(5, 5);

		// Mocking console.log for the tests
		jest.spyOn(console, "log").mockImplementation(() => {});
	});

	afterEach(() => {
		// Restoring console.log after each test
		jest.restoreAllMocks();
	});

	describe("PlaceCommand", () => {
		test("should place the robot on the table", () => {
			const placeCommand = new PlaceCommand({ x: 0, y: 0 }, "NORTH");
			placeCommand.execute(robot, table);

			expect(robot.isOnTable(table)).toBe(true);
		});

		test("should not place the robot outside the table", () => {
			const placeCommand = new PlaceCommand({ x: 5, y: 5 }, "NORTH");
			placeCommand.execute(robot, table);

			expect(robot.isOnTable(table)).toBe(false);
		});

		test("should not place the robot facing an invalid direction", () => {
			// @ts-ignore
			const placeCommand = new PlaceCommand({ x: 0, y: 0 }, "INVALID_DIRECTION");
			placeCommand.execute(robot, table);

			expect(robot.isOnTable(table)).toBe(false);
		});
	});

	describe("MoveCommand", () => {
		test("should not move the robot before being placed", () => {
			const moveCommand = new MoveCommand();
			moveCommand.execute(robot, table);

			expect(robot.report()).toBe(undefined)
		});

		describe("after being placed", () => {
			beforeEach(() => {
				const placeCommand = new PlaceCommand({ x: 0, y: 0 }, "NORTH");
				placeCommand.execute(robot, table);
			});

			test("should move the robot on the table", () => {
				const moveCommand = new MoveCommand();
				moveCommand.execute(robot, table);

				expect(robot.report()).toBe("0,1,NORTH");
			});

			test("should not move the robot outside the table", () => {
				const placeCommand = new PlaceCommand({ x: 4, y: 4 }, "NORTH");
				placeCommand.execute(robot, table);

				const moveCommand = new MoveCommand();
				moveCommand.execute(robot, table);

				expect(robot.report()).toBe("4,4,NORTH");
			});
		});
	});

	describe("TurnCommand", () => {
		test("should not turn the robot before being placed", () => {
			const turnCommand = new TurnCommand("RIGHT");
			turnCommand.execute(robot, table);

			expect(robot.report()).toBe(undefined)
		});

		describe("after being placed", () => {
			beforeEach(() => {
				const placeCommand = new PlaceCommand({ x: 0, y: 0 }, "NORTH");
				placeCommand.execute(robot, table);
			});

			test("should turn the robot left", () => {
				const turnCommand = new TurnCommand("LEFT");
				turnCommand.execute(robot, table);

				expect(robot.report()).toBe("0,0,WEST");
			});

			test("should turn the robot right", () => {
				const turnCommand = new TurnCommand("RIGHT");
				turnCommand.execute(robot, table);

				expect(robot.report()).toBe("0,0,EAST");
			});
		});
	});

	describe("ReportCommand", () => {
		test("should not report the robot before being placed", () => {
			const reportCommand = new ReportCommand();
			reportCommand.execute(robot, table);

			expect(console.log).not.toHaveBeenCalled();
		});

		test("should report the robot position", () => {
			new PlaceCommand({ x: 0, y: 0 }, "NORTH").execute(robot, table);

			new ReportCommand().execute(robot, table);

			expect(console.log).toHaveBeenLastCalledWith("Output: 0,0,NORTH");
		});
	});
});
