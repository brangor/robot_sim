export type Coordinate = {
  x: number;
  y: number;
};

export type CardinalDirection = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type TurningDirection = "LEFT" | "RIGHT";

export type CommandType = "PLACE" | "MOVE" | "LEFT" | "RIGHT" | "REPORT";
