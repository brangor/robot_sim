export type Coordinate = {
  x: number | undefined;
  y: number | undefined;
};

export type CardinalDirection = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type TurningDirection = "LEFT" | "RIGHT";

export type CommandType = "PLACE" | "MOVE" | "LEFT" | "RIGHT" | "REPORT";

export type TestDataType = {
  description: string;
  commands: string[];
  expectedOutput: string;
};
