// src/util/fileUtil.ts
import fs from "fs";
import path from "path";
import { TestDataType } from "../types/Types";
import { isValidTestData } from "./validation";


export function retrieveCommandsFromFile(filePath: string): TestDataType[] | void {
  let testCases: any;

  fs.readFile(filePath, "utf-8", (error, data) => {
    if (error) {
      console.error(`Error reading file: ${error}`);
      return;
    }

    console.clear();
    process.stdout.write("Automated robot simulation started.");

    try {
      testCases = JSON.parse(
        data,
        (_: string, value: any): TestDataType | undefined => {
          if (
            value &&
            typeof value === "object" &&
            "description" in value &&
            "commands" in value &&
            "expectedOutput" in value
          ) {
            return value as TestDataType;
          }

          // Returns undefined (skips) when record doesn't match TestDataType
          return undefined;
        }
      );
    } catch (parseError) {
      console.error(`Error parsing JSON data: ${parseError}`);
    }

    if (!testCases) {
      console.error("No test cases found in file.");
      return;
    } else if (!isValidTestData(testCases)) {
      console.error("Invalid test data format.");
      return;
    }

    return testCases;
  });
};

export function getPathFromArgs(args: string[]): string | undefined {
  if (args.length === 0) return undefined;
  return path.resolve(args[0]);
}
