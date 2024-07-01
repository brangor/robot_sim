// src/__tests__/unit/CommandProcessor.test.ts

import { CommandProcessor } from "../../services/CommandProcessor";
import { MessageSystem } from "../../services/MessageSystem";
import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";
import { getCommandFromInputString } from "../../util/helpers";

describe("CommandProcessor Unit Tests", () => {
  let table: Table;
  let robot: Robot;
  let commandProcessor: CommandProcessor;
  let messageSystem: MessageSystem;

  beforeEach(() => {
    table = new Table(5, 5);
    robot = new Robot();
    messageSystem = new MessageSystem();
    commandProcessor = new CommandProcessor(table, robot, messageSystem);

    jest.spyOn(process.stdout, "write").mockImplementation(() => true);
    jest.spyOn(messageSystem, "enqueueMessage").mockImplementation(async (msg) => {
      if (msg.type === "INFO") {
        process.stdout.write(`Output: ${msg.message}\n`);
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("process", () => {
    it("should place the robot on the table", async () => {
      await commandProcessor.process(
        getCommandFromInputString("PLACE 0,0,NORTH")
      );
      expect(robot.getCoordinates()).toEqual({x: 0, y: 0});
    });

    it("should move the robot on the table", async () => {
      await commandProcessor.process(
        getCommandFromInputString("PLACE 0,0,NORTH")
      );
      await commandProcessor.process(getCommandFromInputString("MOVE"));
      await commandProcessor.process(getCommandFromInputString("REPORT"));

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,1,NORTH\n"
      );
    });

    it("should turn the robot left", async () => {
      await commandProcessor.process(
        getCommandFromInputString("PLACE 0,0,NORTH")
      );
      await commandProcessor.process(getCommandFromInputString("LEFT"));
      await commandProcessor.process(getCommandFromInputString("REPORT"));

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,WEST\n"
      );
    });

    it("should turn the robot right", async () => {
      await commandProcessor.process(
        getCommandFromInputString("PLACE 0,0,NORTH")
      );
      await commandProcessor.process(getCommandFromInputString("RIGHT"));
      await commandProcessor.process(getCommandFromInputString("REPORT"));

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,EAST\n"
      );
    });

    it("should report the robot position", async () => {
      await commandProcessor.process(
        getCommandFromInputString("PLACE 0,0,NORTH")
      );
      await commandProcessor.process(getCommandFromInputString("REPORT"));

      await messageSystem.completeAllMessages();
      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,NORTH\n"
      );
    });

    it("should ignore invalid commands", async () => {
      await commandProcessor.process(
        getCommandFromInputString("PLACE 8,7,NORTH")
      ); // invalid
      await commandProcessor.process(
        getCommandFromInputString("PLACE 3,4,NORTH")
      ); // valid
      await commandProcessor.process(getCommandFromInputString("BLORP")); // invalid
      await commandProcessor.process(getCommandFromInputString("REPORT"));

      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 3,4,NORTH\n"
      );
    });
  });
});
