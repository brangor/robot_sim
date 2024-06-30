// src/__tests__/unit/Command.test.ts

import { Command, PlaceCommand, MoveCommand, TurnCommand, ReportCommand } from "../../models/Command";
import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";

describe("Commands", () => {
	let robot: Robot;
	let table: Table;
	const commands: { [key: string]: Command } = {};

	beforeEach(() => {
		robot = new Robot();
		table = new Table(5, 5);

		jest.spyOn(console, "log").mockImplementation(() => {});
	});

	afterEach(() => {
		// Restoring console.log after each test
		jest.restoreAllMocks();
	});

	describe("PlaceCommand", () => {
		beforeEach(() => {
			commands.place = new PlaceCommand({ x: 0, y: 0 }, "NORTH");
		})

		test("should place the robot on the table", () => {
			commands.place.execute(robot, table);

			expect(robot.hasValidPosition()).toBe(true);
			expect(table.isValidPosition(robot.getPosition())).toBe(true);
		});

		test("should not place the robot outside the table", () => {
			const outOfBoundsLocation = {x: table.getHeight() + 10, y: table.getWidth() + 10};
			new PlaceCommand(outOfBoundsLocation, "NORTH").execute(robot, table);

			expect(robot.hasValidPosition()).toBe(false);
			expect(table.isValidPosition(robot.getPosition())).toBe(false);
		});

		test("should not place the robot facing an invalid direction", () => {
			const invalidDirection = "INVALID_DIRECTION";
			// @ts-ignore
			const placeCommand = new PlaceCommand({ x: 0, y: 0 }, invalidDirection);
			placeCommand.execute(robot, table);

			expect(robot.hasValidPosition()).toBe(false);			expect(table.isValidPosition(robot.getPosition())).toBe(false);
		});

		test("should not place the robot with invalid coordinates", () => {
			const nonIntegerCoordinates = { x: Math.PI, y: Math.sqrt(2) };

			new PlaceCommand(nonIntegerCoordinates, "NORTH").execute(robot, table);

			expect(robot.hasValidPosition()).toBe(false);			expect(table.isValidPosition(robot.getPosition())).toBe(false);
		});
	});

	describe("MoveCommand", () => {
		beforeEach(() => {
			commands.move = new MoveCommand();
			commands.report = new ReportCommand();
		});

		test("should not move the robot before being placed", () => {
			commands.move.execute(robot, table);

			expect(console.log).not.toHaveBeenCalled()
		});

		describe("after being placed", () => {
			beforeEach(() => {
				new PlaceCommand({ x: 0, y: 0 }, "NORTH").execute(robot, table);
			});

			test("should move the robot on the table", () => {
				commands.move.execute(robot, table);
				commands.report.execute(robot, table);
				expect(console.log).toHaveBeenLastCalledWith("Output: 0,1,NORTH");
			});

			test("should not move the robot outside the table", () => {
				commands.report.execute(robot, table);
				expect(console.log).toHaveBeenLastCalledWith("Output: 0,0,NORTH");

				commands.move.execute(robot, table);
				commands.move.execute(robot, table);
				commands.move.execute(robot, table);
				commands.move.execute(robot, table);
				commands.report.execute(robot, table);
				expect(console.log).toHaveBeenLastCalledWith("Output: 0,4,NORTH");

				commands.move.execute(robot, table);
				commands.report.execute(robot, table);
				expect(console.log).toHaveBeenLastCalledWith("Output: 0,4,NORTH");
			});
		});
	});

	describe("TurnCommand", () => {
		beforeEach(() => {
			commands.right = new TurnCommand("RIGHT");
			commands.left = new TurnCommand("LEFT");
		});

		test("should not turn the robot before being placed", () => {
			commands.right.execute(robot, table);

			expect(console.log).not.toHaveBeenCalled()
		});

		describe("after being placed", () => {
			beforeEach(() => {
				commands.place.execute(robot, table);
			});

			test("should turn the robot left", () => {
				commands.left.execute(robot, table);

				commands.report.execute(robot, table);
expect(console.log).toHaveBeenLastCalledWith("Output: 0,0,WEST");
			});

			test("should turn the robot right", () => {
				commands.right.execute(robot, table);

				commands.report.execute(robot, table);
expect(console.log).toHaveBeenLastCalledWith("Output: 0,0,EAST");
			});
		});
	});

	describe("ReportCommand", () => {
		beforeEach(() => {
			commands.report = new ReportCommand();
		})

		test("should not report the robot before being placed", () => {
			commands.report.execute(robot, table);

			expect(console.log).not.toHaveBeenCalled();
		});

		test("should report the robot position", () => {
			commands.place.execute(robot, table);
			commands.report.execute(robot, table);
			expect(console.log).toHaveBeenLastCalledWith("Output: 0,0,NORTH");
		});
	});
});
