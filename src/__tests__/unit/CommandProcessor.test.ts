// src/__tests__/unit/CommandProcessor.test.ts

import { CommandProcessor } from "../../services/CommandProcessor";
import { MessageSystem } from "../../services/MessageSystem";
import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";
import { getCommandFromInputString } from "../../util/helpers";

async function processCommandStrings(
  commandProcessor: CommandProcessor,
  commandStrings: string[]
): Promise<void> {
  commandStrings.map(async (commandString) => {
    const command = getCommandFromInputString(commandString);
    if (command) {
      await commandProcessor.process(command);
    }
  });
}

describe("CommandProcessor Unit Tests", () => {
  let table: Table;
  let robot: Robot;
  let commandProcessor: CommandProcessor;
  let messageSystem: MessageSystem;

  let commandStrings: string[];

  beforeEach(() => {
    table = new Table(5, 5);
    robot = new Robot();
    messageSystem = new MessageSystem();
    commandProcessor = new CommandProcessor(table, robot, messageSystem);

    jest.spyOn(process.stdout, "write").mockImplementation(() => true);
    jest
      .spyOn(messageSystem, "enqueueMessage")
      .mockImplementation(async (msg) => {
        process.stdout.write(`${msg}\n`);
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("process", () => {
    it("should place the robot on the table", async () => {
      await processCommandStrings(commandProcessor, ["PLACE 0,0,NORTH"]);

      expect(robot.getPlacement()).toEqual({coordinates: { x: 0, y: 0 }, direction: "NORTH"});
    });

    it("should move the robot on the table", async () => {
      const commandStrings = ["PLACE 0,0,NORTH", "MOVE", "REPORT"];
      await processCommandStrings(commandProcessor, commandStrings);
      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,1,NORTH\n"
      );
    });

    it("should turn the robot left", async () => {
      commandStrings = ["PLACE 0,0,NORTH", "LEFT", "REPORT"];
      await processCommandStrings(commandProcessor, commandStrings);

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,WEST\n"
      );
    });

    it("should turn the robot right", async () => {
      commandStrings = ["PLACE 0,0,NORTH", "RIGHT", "REPORT"];
      await processCommandStrings(commandProcessor, commandStrings);

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,EAST\n"
      );
    });

    it("should report the robot position", async () => {
      commandStrings = ["PLACE 0,0,NORTH", "REPORT"];
      await processCommandStrings(commandProcessor, commandStrings);

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,NORTH\n"
      );
    });

    it("should ignore invalid commands", async () => {
      commandStrings = [
        "",
        "PLACE A,7,NORTH",
        "PLACE 0,0,NORTH",
        "BLORP",
        "REPORT",
      ];
      await processCommandStrings(commandProcessor, commandStrings);

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,NORTH\n"
      );
    });
  });
});
