// src/__tests__/integration/CommandProcessor.test.ts
import fs from 'fs';
import path from 'path';

import { CommandProcessor } from '../../services/CommandProcessor';
import { Robot } from '../../models/Robot';
import { Table } from '../../models/Table';


describe('CommandProcessor Integration Tests', () => {
	let table: Table;
	let robot: Robot;
	let commandProcessor: CommandProcessor;

	beforeEach(() => {
		table = new Table(5, 5);
		robot = new Robot();
		commandProcessor = new CommandProcessor(table, robot);

		jest.spyOn(console, 'log').mockImplementation(() => {});
	});

	afterEach(() => {
    jest.restoreAllMocks();
  });

		describe("tests from file", () => {
			let testData = [] as { [key: string]: string | string[] }[];

			beforeAll(() => {
			  const dataPath = path.join(__dirname, "data", "commandTestData.json");
			  const fileContents = fs.readFileSync(dataPath, "utf-8");
			  testData = JSON.parse(fileContents);

			  if (testData === undefined) {
				throw new Error("testData is undefined");
			  }

			  jest.spyOn(console, "log").mockImplementation(() => {});
			});

			// test that we have valid test data
			test("test data is valid", () => {
			  expect(testData.length).toBeGreaterThan(0);
			});

			testData.forEach((testCase: {[key: string]: string | string[]}) => {
				const description = testCase.description as string;
				const commands = testCase.commands as string[];
				const expectedOutput = testCase.expectedOutput as string;

				test(description, () => {
					commands.forEach((command) => {
						commandProcessor.process(command);
					});

					commandProcessor.process("REPORT");
					expect(console.log).toHaveBeenLastCalledWith(`Output: ${expectedOutput}`);
				});
			});
		});

	describe('process', () => {
		it('should place the robot on the table', () => {
			commandProcessor.process('PLACE 0,0,NORTH');
			expect(robot.isOnTable(table)).toBe(true);
		});

		it('should move the robot on the table', () => {
			commandProcessor.process('PLACE 0,0,NORTH');
			commandProcessor.process('MOVE');

			commandProcessor.process('REPORT');
			expect(console.log).toHaveBeenLastCalledWith('Output: 0,1,NORTH');
		});

		it('should turn the robot left', () => {
			commandProcessor.process('PLACE 0,0,NORTH');
			commandProcessor.process('LEFT');

			commandProcessor.process('REPORT');
			expect(console.log).toHaveBeenLastCalledWith('Output: 0,0,WEST');
		});

		it('should turn the robot right', () => {
			commandProcessor.process('PLACE 0,0,NORTH');
			commandProcessor.process('RIGHT');

			commandProcessor.process('REPORT');
			expect(console.log).toHaveBeenLastCalledWith('Output: 0,0,EAST');
		});

		it('should report the robot position', () => {
			commandProcessor.process('PLACE 0,0,NORTH');

			commandProcessor.process('REPORT');
			expect(console.log).toHaveBeenLastCalledWith("Output: 0,0,NORTH");
		});

		it('should ignore invalid commands', () => {
			commandProcessor.process('PLACE 8,7,NORTH'); // invalid
			commandProcessor.process('PLACE 3,4,NORTH'); // valid
			commandProcessor.process('BLORP'); // invalid
			commandProcessor.process('REPORT');
			expect(console.log).toHaveBeenLastCalledWith("Output: 3,4,NORTH");
		});
	});
});
