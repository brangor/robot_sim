export type Coordinates = {
  x: number;
  y: number;
};

export type CardinalDirection = "NORTH" | "EAST" | "SOUTH" | "WEST";

export type TurningDirection = "LEFT" | "RIGHT";

export type CommandAction = "PLACE" | "MOVE" | "LEFT" | "RIGHT" | "REPORT" | "EXIT" | "HELP";

export type CommandInput = {
  command: CommandAction;
  placement: Placement | null;
  raw: string;
};

export type CommandInputList = {
  description: string;
  commands: CommandInput[];
  expectedOutput: string | null;
};

export type Placement = {
  coordinates: Coordinates;
  direction: CardinalDirection;
};

export type Message = {
  kind: MessageKind;
  message: string;
  timestamp: number;
};

export type MessageKind = "INFO" | "ERROR" | "DEBUG";
