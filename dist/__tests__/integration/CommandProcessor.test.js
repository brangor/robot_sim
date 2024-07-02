"use strict";
// src/__tests__/integration/CommandProcessor.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const CommandProcessor_1 = require("../../services/CommandProcessor");
const MessageSystem_1 = require("../../services/MessageSystem");
const Robot_1 = require("../../models/Robot");
const Table_1 = require("../../models/Table");
const dataPath = path_1.default.join(__dirname, "data", "commandTestData.json");
describe("CommandProcessor Integration Tests", () => {
    let table;
    let robot;
    let commandProcessor;
    let messageSystem;
    let testData;
    // Initialize shared resources before each test
    beforeEach(() => {
        table = new Table_1.Table(5, 5);
        robot = new Robot_1.Robot();
        messageSystem = new MessageSystem_1.MessageSystem();
        commandProcessor = new CommandProcessor_1.CommandProcessor(table, robot, messageSystem);
        jest.spyOn(process.stdout, "write").mockImplementation(() => true);
        jest
            .spyOn(messageSystem, "enqueueMessage")
            .mockImplementation(async (msg) => {
            process.stdout.write(`${msg.message}\n`);
        });
    });
    beforeAll(async () => {
        try {
            const fileContents = await fs_1.default.promises.readFile(dataPath, "utf-8");
            testData = JSON.parse(fileContents);
        }
        catch (error) {
            console.error(`Error reading test data: ${error}`);
        }
    });
    // Clean up after each test
    afterAll(() => {
        jest.restoreAllMocks();
    });
    // Define a single test to wrap dynamic assertions
    test("Process commands and validate outputs", async () => {
        // Ensure testData is loaded
        expect(testData).toBeDefined();
        expect(testData.length).toBeGreaterThan(0);
        // Iterate over each test case using for...of to ensure sequential processing
        for (const { description, commands, expectedOutput } of testData) {
            jest.clearAllMocks();
            commandProcessor.resetSimulation();
            // Process commands sequentially
            for (const command of commands) {
                await commandProcessor.process(command);
            }
            await messageSystem.processingComplete();
            // Assert expected output
            expect(process.stdout.write).toHaveBeenLastCalledWith(expectedOutput);
        }
    });
});
