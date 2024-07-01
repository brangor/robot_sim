export type Coordinate = {
  x: number | undefined;
  y: number | undefined;
};

export type CardinalDirection = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type TurningDirection = "LEFT" | "RIGHT";

export type CommandType = "PLACE" | "MOVE" | "LEFT" | "RIGHT" | "REPORT" | "EXIT" | "HELP";

export type CommandInputType = {
  command: CommandType | undefined;
  arg: string | undefined;
  raw: string;
};

export type TestDataType = {
  description: string;
  commands: CommandInputType[];
  expectedOutput: string;
};

export type PlacementType = {
  coordinates: Coordinate;
  direction: CardinalDirection;
};

export type MessageType = {
  type: "INFO" | "ERROR" | "DEBUG";
  message: string;
  timestamp: number;
};
