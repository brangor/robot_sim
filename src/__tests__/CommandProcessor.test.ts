
import { CommandProcessor } from '../services/CommandProcessor';
import { Robot } from '../models/Robot';
import { Table } from '../models/Table';

describe('CommandProcessor', () => {
	let table: Table;
	let robot: Robot;
	let commandProcessor: CommandProcessor;

	beforeEach(() => {
		table = new Table(5, 5);
		robot = new Robot();
		commandProcessor = new CommandProcessor(table, robot);

		jest.spyOn(console, 'log').mockImplementation(() => {});
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
