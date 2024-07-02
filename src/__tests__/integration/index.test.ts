// src/__tests__/integration/index.test.ts

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import util from "util";
import type { CommandInputList } from "../../types/Types";

const execAsync = util.promisify(exec);

describe("Robot Simulation", () => {
  let testData: CommandInputList[];
  const dataPath = path.join(__dirname, "data", "commandTestData.json");

  beforeAll(async () => {
    try {
      const fileContents = await fs.promises.readFile(dataPath, "utf-8");
      testData = JSON.parse(fileContents) as CommandInputList[];
    } catch (error) {
      console.error(`Error reading test data: ${error}`);
    }
  });

  test("Process commands and validate outputs", async () => {
    // Ensure testData is loaded
    expect(testData).toBeDefined();
    expect(testData.length).toBeGreaterThan(0);

    // Create a temporary test data file
    const tempTestDataPath = path.join(__dirname, "tempTestData.json");
    await fs.promises.writeFile(
      tempTestDataPath,
      JSON.stringify(testData, null, 2)
    );

    try {
      const { stdout, stderr } = await execAsync(
        `node ./dist/index.js ${tempTestDataPath}`
      );

      if (stderr) {
        console.log(`Standard error: ${stderr}`);
      }

      // Process standard output and validate
      const lines = stdout.trim().split("\n");
      const lastLine = lines[lines.length - 1];
      expect(lastLine).toBe(
        `${testData.length} out of ${testData.length} test cases successful.`
      );
    } catch (error) {
      console.error(`Error executing test: ${error}`);
      throw error; // Ensure the test fails if there is an error
    } finally {
      // Clean up the temporary file
      await fs.promises.unlink(tempTestDataPath);
    }
  });
});
