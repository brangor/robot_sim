// src/__tests__/unit/CommandProcessor.test.ts

import { CommandProcessor } from '../../services/CommandProcessor';
import { MessageSystem } from '../../services/MessageSystem';
import { Robot } from '../../models/Robot';
import { Table } from '../../models/Table';
import { getCommandFromInputString } from '../../util/helpers';

describe('CommandProcessor Unit Tests', () => {
	let table: Table;
	let robot: Robot;
	let commandProcessor: CommandProcessor;
	let messageSystem: MessageSystem;

	beforeEach(() => {
		table = new Table(5, 5);
		robot = new Robot();
		commandProcessor = new CommandProcessor(table, robot, messageSystem);

    jest.spyOn(process.stdout, "write").mockImplementation(() => true);
	});

	afterEach(() => {
    jest.restoreAllMocks();
  });

	describe('process', () => {
		it('should place the robot on the table', () => {
			commandProcessor.process(getCommandFromInputString('PLACE 0,0,NORTH'));
			expect(table.isValidPosition(robot.getPosition())).toBe(true);
		});

		it('should move the robot on the table', () => {
			commandProcessor.process(getCommandFromInputString('PLACE 0,0,NORTH'));
			commandProcessor.process(getCommandFromInputString('MOVE'));

			commandProcessor.process(getCommandFromInputString('REPORT'));
			expect(process.stdout.write).toHaveBeenLastCalledWith('Output: 0,1,NORTH');
		});

		it('should turn the robot left', () => {
			commandProcessor.process(getCommandFromInputString('PLACE 0,0,NORTH'));
			commandProcessor.process(getCommandFromInputString('LEFT'));

			commandProcessor.process(getCommandFromInputString('REPORT'));
			expect(process.stdout.write).toHaveBeenLastCalledWith('Output: 0,0,WEST');
		});

		it('should turn the robot right', () => {
			commandProcessor.process(getCommandFromInputString('PLACE 0,0,NORTH'));
			commandProcessor.process(getCommandFromInputString('RIGHT'));

			commandProcessor.process(getCommandFromInputString('REPORT'));
			expect(process.stdout.write).toHaveBeenLastCalledWith('Output: 0,0,EAST');
		});

		it('should report the robot position', () => {
			commandProcessor.process(getCommandFromInputString('PLACE 0,0,NORTH'));

			commandProcessor.process(getCommandFromInputString('REPORT'));
			expect(process.stdout.write).toHaveBeenLastCalledWith("Output: 0,0,NORTH");
		});

		it('should ignore invalid commands', () => {
			commandProcessor.process(getCommandFromInputString('PLACE 8,7,NORTH')); // inval)id
			commandProcessor.process(getCommandFromInputString('PLACE 3,4,NORTH')); // val)id
			commandProcessor.process(getCommandFromInputString('BLORP')); // inval)id
			commandProcessor.process(getCommandFromInputString('REPORT'));
			expect(process.stdout.write).toHaveBeenLastCalledWith("Output: 3,4,NORTH");
		});
	});
});
