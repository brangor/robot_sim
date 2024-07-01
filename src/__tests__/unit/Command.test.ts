// src/__tests__/unit/Command.test.ts

import {
  Command,
  PlaceCommand,
  MoveCommand,
  TurnCommand,
  ReportCommand,
} from "../../commands/Command";
import { Robot } from "../../models/Robot";
import { Table } from "../../models/Table";
import type { PlacementType } from "../../types/Types";

describe("Commands", () => {
  let robot: Robot;
  let table: Table;
  const commands: { [key: string]: Command } = {};
  const defaultPlacement: PlacementType = {
    coordinates: {
      x: 0,
      y: 0,
    },
    direction: "NORTH",
  };

  beforeEach(() => {
    robot = new Robot();
    table = new Table(5, 5);

    jest.spyOn(process.stdout, "write").mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("PlaceCommand", () => {
    beforeEach(() => {
      commands.place = new PlaceCommand(defaultPlacement);
    });

    test("should place the robot on the table", () => {
      commands.place.execute(robot, table);

      expect(table.isValidPosition(robot.getPosition())).toBe(true);
    });

    test("should not place the robot outside the table", () => {
      const outOfBoundsPlacement = {
        ...defaultPlacement,
        coordinates: { x: table.getHeight() + 10, y: table.getWidth() + 10 },
      };
      new PlaceCommand(outOfBoundsPlacement).execute(robot, table);

      expect(table.isValidPosition(robot.getPosition())).toBe(false);
    });

    test("should not place the robot facing an invalid direction", () => {
      const invalidDirectionPlacement = {
        ...defaultPlacement,
        direction: "INVALID_DIRECTION",
      };
      // @ts-ignore
      new PlaceCommand(invalidDirectionPlacement).execute(robot, table);

      expect(table.isValidPosition(robot.getPosition())).toBe(false);
    });

    test("should not place the robot with invalid coordinates", () => {
      const nonIntegerCoordinatePlacement = {
        ...defaultPlacement,
        coordinates: { x: Math.PI, y: Math.sqrt(2) },
      };

      new PlaceCommand(nonIntegerCoordinatePlacement).execute(robot, table);

      expect(table.isValidPosition(robot.getPosition())).toBe(false);
    });
  });

  describe("MoveCommand", () => {
    beforeEach(() => {
      commands.move = new MoveCommand();
      commands.report = new ReportCommand();
    });

    test("should not move the robot before being placed", () => {
      commands.move.execute(robot, table);

      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    describe("after being placed", () => {
      beforeEach(() => {
        commands.place.execute(robot, table);
      });

      test("should move the robot on the table", () => {
        commands.move.execute(robot, table);
        commands.report.execute(robot, table);
        expect(process.stdout.write).toHaveBeenLastCalledWith(
          "Output: 0,1,NORTH\n"
        );
      });

      test("should not move the robot outside the table", () => {
        commands.report.execute(robot, table);
        expect(process.stdout.write).toHaveBeenLastCalledWith(
          "Output: 0,0,NORTH\n"
        );

        commands.move.execute(robot, table);
        commands.move.execute(robot, table);
        commands.move.execute(robot, table);
        commands.move.execute(robot, table);
        commands.report.execute(robot, table);
        expect(process.stdout.write).toHaveBeenLastCalledWith(
          "Output: 0,4,NORTH\n"
        );

        commands.move.execute(robot, table);
        commands.report.execute(robot, table);
        expect(process.stdout.write).toHaveBeenLastCalledWith(
          "Output: 0,4,NORTH\n"
        );
      });
    });
  });

  describe("TurnCommand", () => {
    beforeEach(() => {
      commands.right = new TurnCommand("RIGHT");
      commands.left = new TurnCommand("LEFT");
    });

    test("should not turn the robot before being placed", () => {
      commands.right.execute(robot, table);

      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    describe("after being placed", () => {
      beforeEach(() => {
        commands.place.execute(robot, table);
      });

      test("should turn the robot left", () => {
        commands.left.execute(robot, table);

        commands.report.execute(robot, table);
        expect(process.stdout.write).toHaveBeenLastCalledWith(
          "Output: 0,0,WEST\n"
        );
      });

      test("should turn the robot right", () => {
        commands.right.execute(robot, table);

        commands.report.execute(robot, table);
        expect(process.stdout.write).toHaveBeenLastCalledWith(
          "Output: 0,0,EAST\n"
        );
      });
    });
  });

  describe("ReportCommand", () => {
    beforeEach(() => {
      commands.report = new ReportCommand();
    });

    test("should not report the robot before being placed", () => {
      commands.report.execute(robot, table);

      expect(process.stdout.write).not.toHaveBeenCalled();
    });

    test("should report the robot position", () => {
      commands.place.execute(robot, table);
      commands.report.execute(robot, table);
      expect(process.stdout.write).toHaveBeenLastCalledWith(
        "Output: 0,0,NORTH\n"
      );
    });
  });
});
