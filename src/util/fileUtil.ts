// src/util/fileUtil.ts

import fs from "fs";
import path from "path";
import { CommandInputList } from "../types/Types";
import { getCommandFromInputString } from "./helpers";

function reviver(key: string, value: any): any {
  if (key === "" || (typeof value === "object" && value !== null)) {
    if (
      value &&
      typeof value === "object" &&
      "description" in value &&
      "commands" in value &&
      "expectedOutput" in value
    ) {
      const commands = value.commands
        .map((commandString: string) => {
          const command = getCommandFromInputString(commandString);
          if (!command) return;
          return command;
        })
        .filter(Boolean); // Filter out any undefined values
      return {
        ...value,
        commands,
      } as CommandInputList;
    }
  }
  return value;
}

export function retrieveCommandsFromFile( filePath: string ): CommandInputList[] {
  let data: string;
  let testCases: CommandInputList[];

  try {
    data = fs.readFileSync(filePath, "utf-8");
  } catch (parseError) {
    if (parseError instanceof Error) {
      throw parseError;
    } else {
      throw new Error("An unknown error occurred while reading the file.");
    }
  }

  testCases = JSON.parse(data, reviver);

  if (testCases.length === 0) {
    throw new Error("No test cases found in file.");
  }

  return testCases;
}

export function getPathFromArgs(args: string[]): string {
  try {
    if (args.length === 0) throw "Cannot find file path in arguments.";
    return path.resolve(args[0]);
  } catch (error) {
    throw new Error(`Error parsing arguments: ${error}`);
  }
}
