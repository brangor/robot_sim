"use strict";
// src/util/fileUtil.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveCommandsFromFile = retrieveCommandsFromFile;
exports.getPathFromArgs = getPathFromArgs;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("./helpers");
function reviver(key, value) {
    if (key === "" || (typeof value === "object" && value !== null)) {
        if (value &&
            typeof value === "object" &&
            "description" in value &&
            "commands" in value &&
            "expectedOutput" in value) {
            const commands = value.commands
                .map((commandString) => {
                const command = (0, helpers_1.getCommandFromInputString)(commandString);
                if (!command)
                    return;
                return command;
            })
                .filter(Boolean); // Filter out any undefined values
            return {
                ...value,
                commands,
            };
        }
    }
    return value;
}
function retrieveCommandsFromFile(filePath) {
    let data;
    let testCases;
    try {
        data = fs_1.default.readFileSync(filePath, "utf-8");
    }
    catch (parseError) {
        if (parseError instanceof Error) {
            throw parseError;
        }
        else {
            throw new Error("An unknown error occurred while reading the file.");
        }
    }
    testCases = JSON.parse(data, reviver);
    if (testCases.length === 0) {
        throw new Error("No test cases found in file.");
    }
    return testCases;
}
function getPathFromArgs(args) {
    try {
        if (args.length === 0)
            throw "Cannot find file path in arguments.";
        return path_1.default.resolve(args[0]);
    }
    catch (error) {
        throw new Error(`Error parsing arguments: ${error}`);
    }
}
