"use strict";
// src/__tests__/unit/Command.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = require("../../models/Command");
const Robot_1 = require("../../models/Robot");
const Table_1 = require("../../models/Table");
describe("Commands", () => {
    let robot;
    let table;
    const defaultPlacement = {
        coordinates: { x: 0, y: 0 },
        direction: "NORTH",
    };
    beforeEach(() => {
        robot = new Robot_1.Robot();
        table = new Table_1.Table(5, 5);
        jest.spyOn(process.stdout, "write").mockImplementation(() => true);
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe("PlaceCommand", () => {
        it("should place the robot on the table", () => {
            const placeCommand = new Command_1.PlaceCommand(defaultPlacement);
            placeCommand.execute(robot, table);
            expect(robot.getPlacement()).toEqual(defaultPlacement);
        });
        it("should not place the robot outside the table", () => {
            const outOfBoundsPlacement = {
                ...defaultPlacement,
                coordinates: { x: 10, y: 10 },
            };
            const placeCommand = new Command_1.PlaceCommand(outOfBoundsPlacement);
            placeCommand.execute(robot, table);
            expect(robot.getPlacement()).toEqual(undefined);
        });
        it("should not place the robot facing an invalid direction", () => {
            const invalidDirectionPlacement = {
                ...defaultPlacement,
                // @ts-ignore
                direction: "INVALID_DIRECTION",
            };
            // @ts-ignore
            const placeCommand = new Command_1.PlaceCommand(invalidDirectionPlacement);
            placeCommand.execute(robot, table);
            expect(robot.getPlacement()).toEqual(undefined);
        });
        it("should not place the robot with invalid coordinates", () => {
            const nonIntegerCoordinatePlacement = {
                ...defaultPlacement,
                coordinates: { x: Math.PI, y: Math.sqrt(2) },
            };
            const placeCommand = new Command_1.PlaceCommand(nonIntegerCoordinatePlacement);
            placeCommand.execute(robot, table);
            expect(robot.getPlacement()).toEqual(undefined);
        });
    });
    describe("MoveCommand", () => {
        let placeCommand;
        let moveCommand;
        let reportCommand;
        beforeEach(() => {
            placeCommand = new Command_1.PlaceCommand(defaultPlacement);
            moveCommand = new Command_1.MoveCommand();
            reportCommand = new Command_1.ReportCommand();
        });
        it("should not move the robot before being placed", () => {
            moveCommand.execute(robot, table);
            const messages = robot.dumpMessageQueue();
            expect(messages).toEqual([]);
        });
        describe("after being placed", () => {
            beforeEach(() => {
                placeCommand.execute(robot, table);
            });
            it("should move the robot on the table", () => {
                moveCommand.execute(robot, table);
                reportCommand.execute(robot, table);
                const messages = robot.dumpMessageQueue();
                expect(messages).toEqual(["Output: 0,1,NORTH"]);
            });
            it("should not move the robot outside the table", () => {
                for (let i = 0; i < 5; i++) {
                    moveCommand.execute(robot, table);
                }
                reportCommand.execute(robot, table);
                const messages = robot.dumpMessageQueue();
                expect(messages).toEqual(["Output: 0,4,NORTH"]);
            });
        });
    });
    describe("TurnCommand", () => {
        let placeCommand;
        let turnLeftCommand;
        let turnRightCommand;
        let reportCommand;
        beforeEach(() => {
            placeCommand = new Command_1.PlaceCommand(defaultPlacement);
            turnLeftCommand = new Command_1.TurnCommand("LEFT");
            turnRightCommand = new Command_1.TurnCommand("RIGHT");
            reportCommand = new Command_1.ReportCommand();
        });
        it("should not turn the robot before being placed", () => {
            turnRightCommand.execute(robot, table);
            const messages = robot.dumpMessageQueue();
            expect(messages).toEqual([]);
        });
        describe("after being placed", () => {
            beforeEach(() => {
                placeCommand.execute(robot, table);
            });
            it("should turn the robot left", () => {
                turnLeftCommand.execute(robot, table);
                reportCommand.execute(robot, table);
                const messages = robot.dumpMessageQueue();
                expect(messages).toEqual(["Output: 0,0,WEST"]);
            });
            it("should turn the robot right", () => {
                turnRightCommand.execute(robot, table);
                reportCommand.execute(robot, table);
                const messages = robot.dumpMessageQueue();
                expect(messages).toEqual(["Output: 0,0,EAST"]);
            });
        });
    });
    describe("ReportCommand", () => {
        let placeCommand;
        let reportCommand;
        beforeEach(() => {
            placeCommand = new Command_1.PlaceCommand(defaultPlacement);
            reportCommand = new Command_1.ReportCommand();
        });
        it("should not report the robot before being placed", () => {
            reportCommand.execute(robot, table);
            const messages = robot.dumpMessageQueue();
            expect(messages).toEqual([]);
        });
        it("should report the robot position", () => {
            placeCommand.execute(robot, table);
            reportCommand.execute(robot, table);
            const messages = robot.dumpMessageQueue();
            expect(messages).toEqual(["Output: 0,0,NORTH"]);
        });
    });
});
