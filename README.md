# SEEK PASS ROBOT CHALLENGE

## Installation

1. Clone the repository
2. Ensure you're on the right node version - `nvm use` if you've got nvm installed, otherwise consult the .nvmrc for current version
3. Install dependencies - `npm install`
4. Run the tests - `npm test`
5. Run the program - `npm start`

## Usage

The program can be run manually or passed the location of a JSON file for automated scenarios.

Examples:
 - `npm start` - manual mode
 - `npm start ./src/__tests__/data/sampleData.json` - automated mode
   - More test data can be found in this directory. The JSON file should contain an array of commands to be executed by the robot.

## Testing
Running `npm test` will run the Jest tests, unit and integration.

### Test Data
#### Location
The integration tests are run against some test data JSON files located in `./src/__tests__/data`
You may also run the program with a specific test data file by passing the file location as an argument to the program.

#### Writing test data files
The test data JSON files should contain an array of commands to be executed by the robot. The format is as follows:
```json
[
	{
		"description": "This test case",
		"commands" : [ "PLACE 0,0,NORTH", "MOVE", "REPORT" ],
		"expectedOutput": "Output: 0,1,NORTH"
	},
	{
		"description": "Another test case",
		"commands" : [ "PLACE 0,0,NORTH", "LEFT", "REPORT" ],
		"expectedOutput": "Output: 0,0,WEST"
	}
]
```

Field explanations:
- `description` - a clear explanation of what this test case is testing
- `commands` - an array of commands to be executed by the robot, written as you would input them in the command line
- `expectedOutput` - the expected output of the commands above. Generally it's the output of the last REPORT command

### Manual

Run the program with `npm start` and issue the robot commands by typing in the console. Type 'HELP' for a list of available commands, and type 'EXIT' to quit the program.

Commands are case-insensitive, but must follow the format specified in the HELP command instructions.

