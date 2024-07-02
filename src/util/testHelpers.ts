import type { CommandProcessor } from "../services/CommandProcessor";
import { getCommandFromInputString } from "./helpers";

export async function processCommandStrings(
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
