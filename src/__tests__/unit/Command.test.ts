// src/__tests__/unit/Command.test.ts

import {
  PlaceCommand,
  MoveCommand,
  TurnCommand,
  ReportCommand,
} from "../../models/Command";
import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";
import type { Placement, CardinalDirection } from "../../types/Types";

describe("Commands", () => {
  let robot: Robot;
  let table: Table;
  const defaultPlacement: Placement = {
    coordinates: { x: 0, y: 0 },
    direction: "NORTH" as CardinalDirection,
  };

  beforeEach(() => {
    robot = new Robot();
    table = new Table(5, 5);
  });

  describe("PlaceCommand", () => {
    it("should place the robot on the table", () => {
      const placeCommand = new PlaceCommand(defaultPlacement);
      placeCommand.execute(robot, table);

      expect(robot.getPlacement()).toEqual(defaultPlacement);
    });

    it("should not place the robot outside the table", () => {
      const outOfBoundsPlacement = {
        ...defaultPlacement,
        coordinates: { x: 10, y: 10 },
      };
      const placeCommand = new PlaceCommand(outOfBoundsPlacement);
      placeCommand.execute(robot, table);

      expect(robot.getPlacement()).toEqual(undefined);
    });

    it("should not place the robot facing an invalid direction", () => {
      const invalidDirectionPlacement = {
        ...defaultPlacement,
        // @ts-ignore
        direction: "INVALID_DIRECTION",
      };
      // @ts-ignore
      const placeCommand = new PlaceCommand(invalidDirectionPlacement);
      placeCommand.execute(robot, table);

      expect(robot.getPlacement()).toEqual(undefined);
    });

    it("should not place the robot with invalid coordinates", () => {
      const nonIntegerCoordinatePlacement = {
        ...defaultPlacement,
        coordinates: { x: Math.PI, y: Math.sqrt(2) },
      };
      const placeCommand = new PlaceCommand(nonIntegerCoordinatePlacement);
      placeCommand.execute(robot, table);

      expect(robot.getPlacement()).toEqual(undefined);
    });
  });

  describe("MoveCommand", () => {
    let placeCommand: PlaceCommand;
    let moveCommand: MoveCommand;
    let reportCommand: ReportCommand;

    beforeEach(() => {
      placeCommand = new PlaceCommand(defaultPlacement);
      moveCommand = new MoveCommand();
      reportCommand = new ReportCommand();
    });

    it("should not move the robot before being placed", () => {
      moveCommand.execute(robot, table);

      const messages = robot.dumpMessageQueue();
      expect(messages).toEqual([]);
    });

    describe("after being placed", () => {
      beforeEach(() => {
        placeCommand.execute(robot, table);
      });

      it("should move the robot on the table", () => {
        moveCommand.execute(robot, table);
        reportCommand.execute(robot, table);

        const messages = robot.dumpMessageQueue();
        expect(messages).toEqual(["Output: 0,1,NORTH"]);
      });

      it("should not move the robot outside the table", () => {
        for (let i = 0; i < 5; i++) {
          moveCommand.execute(robot, table);
        }
        reportCommand.execute(robot, table);

        const messages = robot.dumpMessageQueue();
        expect(messages).toEqual(["Output: 0,4,NORTH"]);
      });
    });
  });

  describe("TurnCommand", () => {
    let placeCommand: PlaceCommand;
    let turnLeftCommand: TurnCommand;
    let turnRightCommand: TurnCommand;
    let reportCommand: ReportCommand;

    beforeEach(() => {
      placeCommand = new PlaceCommand(defaultPlacement);
      turnLeftCommand = new TurnCommand("LEFT");
      turnRightCommand = new TurnCommand("RIGHT");
      reportCommand = new ReportCommand();
    });

    it("should not turn the robot before being placed", () => {
      turnRightCommand.execute(robot, table);

      const messages = robot.dumpMessageQueue();
      expect(messages).toEqual([]);
    });

    describe("after being placed", () => {
      beforeEach(() => {
        placeCommand.execute(robot, table);
      });

      it("should turn the robot left", () => {
        turnLeftCommand.execute(robot, table);
        reportCommand.execute(robot, table);

        const messages = robot.dumpMessageQueue();
        expect(messages).toEqual(["Output: 0,0,WEST"]);
      });

      it("should turn the robot right", () => {
        turnRightCommand.execute(robot, table);
        reportCommand.execute(robot, table);

        const messages = robot.dumpMessageQueue();
        expect(messages).toEqual(["Output: 0,0,EAST"]);
      });
    });
  });

  describe("ReportCommand", () => {
    let placeCommand: PlaceCommand;
    let reportCommand: ReportCommand;

    beforeEach(() => {
      placeCommand = new PlaceCommand(defaultPlacement);
      reportCommand = new ReportCommand();
    });

    it("should not report the robot before being placed", () => {
      reportCommand.execute(robot, table);

      const messages = robot.dumpMessageQueue();
      expect(messages).toEqual([]);
    });

    it("should report the robot position", () => {
      placeCommand.execute(robot, table);
      reportCommand.execute(robot, table);

      const messages = robot.dumpMessageQueue();
      expect(messages).toEqual(["Output: 0,0,NORTH"]);
    });
  });
});
