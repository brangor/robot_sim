// src/util/programFlow.ts

import type { CommandProcessor } from "../services/CommandProcessor";
import { CommandInput } from "../types/Types";
import { printEndSession } from "./IO";

export async function processCommands(
  commands: CommandInput[],
  commandProcessor: CommandProcessor
) {
  for (const command of commands) {
    await commandProcessor.process(command);
	}
}

export function endSession() {
  printEndSession();
  process.exit();
}
