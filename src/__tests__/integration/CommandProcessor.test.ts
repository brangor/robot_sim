// Attempt to import JSON data directly if supported
import path from "path";
import fs from "fs";
import { CommandProcessor } from "../../services/CommandProcessor";
import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";
import { TestDataType } from "../../types/Types";

const dataPath = path.join(__dirname, "data", "commandTestData.json");

describe("CommandProcessor Integration Tests", () => {
  let table: Table;
  let robot: Robot;
  let commandProcessor: CommandProcessor;
  let testData: TestDataType[];

  // Initialize shared resources before each test
  beforeEach(() => {
    table = new Table(5, 5);
    robot = new Robot();
    commandProcessor = new CommandProcessor(table, robot);
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  beforeAll(async () => {
    try {
      const fileContents = await fs.promises.readFile(dataPath, "utf-8");
      testData = JSON.parse(fileContents) as TestDataType[];
    } catch (error) {
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

      console.log(`Running test case: ${description}`);

      // Process commands sequentially
      for (const command of commands) {
        await commandProcessor.process(command);
      }

      // Assert expected output
      expect(console.log).toHaveBeenLastCalledWith(expectedOutput);
    }
  });
});
