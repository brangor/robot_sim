"use strict";
// src/__tests__/integration/index.test.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const execAsync = util_1.default.promisify(child_process_1.exec);
describe("Robot Simulation", () => {
    let testData;
    const dataPath = path_1.default.join(__dirname, "../data", "sampleTests.json");
    beforeAll(async () => {
        try {
            const fileContents = await fs_1.default.promises.readFile(dataPath, "utf-8");
            testData = JSON.parse(fileContents);
        }
        catch (error) {
            console.error(`Error reading test data: ${error}`);
        }
    });
    test("Process commands and validate outputs", async () => {
        expect(testData).toBeDefined();
        expect(testData.length).toBeGreaterThan(0);
        try {
            const { stdout, stderr } = await execAsync(`npm start -- ${dataPath}`);
            if (stderr) {
                console.log(`Standard error: ${stderr}`);
            }
            const lines = stdout.trim().split("\n");
            const lastLine = lines[lines.length - 1];
            expect(lastLine).toBe(`${testData.length} out of ${testData.length} test cases successful.`);
        }
        catch (error) {
            console.error(`Error executing test: ${error}`);
            throw error;
        }
    });
});
