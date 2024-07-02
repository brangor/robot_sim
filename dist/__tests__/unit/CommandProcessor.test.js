"use strict";
// src/__tests__/unit/CommandProcessor.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
const CommandProcessor_1 = require("../../services/CommandProcessor");
const MessageSystem_1 = require("../../services/MessageSystem");
const Robot_1 = require("../../models/Robot");
const Table_1 = require("../../models/Table");
const helpers_1 = require("../../util/helpers");
async function processCommandStrings(commandProcessor, commandStrings) {
    commandStrings.map(async (commandString) => {
        const command = (0, helpers_1.getCommandFromInputString)(commandString);
        if (command) {
            await commandProcessor.process(command);
        }
    });
}
describe("CommandProcessor Unit Tests", () => {
    let table;
    let robot;
    let commandProcessor;
    let messageSystem;
    let commandStrings;
    beforeEach(() => {
        table = new Table_1.Table(5, 5);
        robot = new Robot_1.Robot();
        messageSystem = new MessageSystem_1.MessageSystem();
        commandProcessor = new CommandProcessor_1.CommandProcessor(table, robot, messageSystem);
        jest.spyOn(process.stdout, "write").mockImplementation(() => true);
        jest
            .spyOn(messageSystem, "enqueueMessage")
            .mockImplementation(async (msg) => {
            process.stdout.write(`${msg}\n`);
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe("process", () => {
        it("should place the robot on the table", async () => {
            await processCommandStrings(commandProcessor, ["PLACE 0,0,NORTH"]);
            expect(robot.getPlacement()).toEqual({ coordinates: { x: 0, y: 0 }, direction: "NORTH" });
        });
        it("should move the robot on the table", async () => {
            const commandStrings = ["PLACE 0,0,NORTH", "MOVE", "REPORT"];
            await processCommandStrings(commandProcessor, commandStrings);
            expect(process.stdout.write).toHaveBeenLastCalledWith("Output: 0,1,NORTH\n");
        });
        it("should turn the robot left", async () => {
            commandStrings = ["PLACE 0,0,NORTH", "LEFT", "REPORT"];
            await processCommandStrings(commandProcessor, commandStrings);
            expect(process.stdout.write).toHaveBeenLastCalledWith("Output: 0,0,WEST\n");
        });
        it("should turn the robot right", async () => {
            commandStrings = ["PLACE 0,0,NORTH", "RIGHT", "REPORT"];
            await processCommandStrings(commandProcessor, commandStrings);
            expect(process.stdout.write).toHaveBeenLastCalledWith("Output: 0,0,EAST\n");
        });
        it("should report the robot position", async () => {
            commandStrings = ["PLACE 0,0,NORTH", "REPORT"];
            await processCommandStrings(commandProcessor, commandStrings);
            expect(process.stdout.write).toHaveBeenLastCalledWith("Output: 0,0,NORTH\n");
        });
        it("should ignore invalid commands", async () => {
            commandStrings = [
                "",
                "PLACE A,7,NORTH",
                "PLACE 0,0,NORTH",
                "BLORP",
                "REPORT",
            ];
            await processCommandStrings(commandProcessor, commandStrings);
            expect(process.stdout.write).toHaveBeenLastCalledWith("Output: 0,0,NORTH\n");
        });
    });
});
