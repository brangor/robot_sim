// src/helpers.ts

import type {
  Coordinates,
  CommandAction,
  CommandInput,
  Placement,
  CardinalDirection,
} from "../types/Types";
import { isValidCommandString } from "./validation";

export function addCoordinates(a: Coordinates, b: Coordinates): Coordinates {
  return {
    x: (a.x ?? 0) + (b.x ?? 0),
    y: (a.y ?? 0) + (b.y ?? 0),
  };
}

export function getCommandFromInputString(command: string): CommandInput | undefined {
  let parts: string[];

  if (!command || !isValidCommandString(command)) return undefined;

  if (command.includes(" ")) {
    parts = command.split(" ");
  } else {
    parts = [command];
  }

  return {
    command: (parts[0] as CommandAction),
    placement: parts[1] ? getPlacementFromArg(parts[1]) : null,
    raw: command,
  };
}

export function getPlacementFromArg(arg: string): Placement | null {
  if (!arg || !arg.includes(",")) return null;
  const parts = arg.split(",");
  if (parts.length !== 3) return null;

  const x = parseInt(parts[0]);
  const y = parseInt(parts[1]);
  const dir = parts[2] as CardinalDirection;

  if (isNaN(x) || isNaN(y) || !dir) return null;

  return {
    coordinates: { x, y },
    direction: dir,
  };
}
