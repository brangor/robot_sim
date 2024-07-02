// src/services/CommandProcessor.ts

import {
  Command,
  PlaceCommand,
  MoveCommand,
  TurnCommand,
  ReportCommand,
} from "../models/Command";
import { Robot } from "../models/Robot";
import { Table } from "../models/Table";
import { getPlacementFromArg } from "../util/helpers";
import { MessageSystem } from "./MessageSystem";
import { createInfoMessage } from "../util/message";
import { printHelp, printEndSession } from "../util/IO";

import type {
  CommandInput,
  TurningDirection,
  Message,
} from "../types/Types";

export class CommandProcessor {
  private robot: Robot;
  private table: Table;
  private messageSystem: MessageSystem;
  private commandInputQueue: CommandInput[] = [];

  constructor(table: Table, robot: Robot, messageSystem: MessageSystem) {
    this.robot = robot;
    this.table = table;
    this.messageSystem = messageSystem;
  }

  async process(commandInput: CommandInput): Promise<void> {
    const type = commandInput.command;
    if (!type) return;

    let command: Command | undefined;

    switch (type) {
      case "PLACE":
        if (!commandInput.placement) break;
        command = new PlaceCommand(commandInput.placement);
        break;
      case "MOVE":
        command = new MoveCommand();
        break;
      case "LEFT":
        command = new TurnCommand("LEFT" as TurningDirection);
        break;
      case "RIGHT":
        command = new TurnCommand("RIGHT" as TurningDirection);
        break;
      case "REPORT":
        command = new ReportCommand();
        break;
      case "EXIT":
      case "HELP":
      default:
        break;
    }

    if (command) {
      command.execute(this.robot, this.table);
    }

    const messages = this.robot.dumpMessageQueue();

    if (messages.length > 0) {
      for (const message of messages) {
        await this.messageSystem.enqueueMessage(message);
      }
    }
  }

  public getLatestOutput(): string | undefined {
    return this.messageSystem.getAllOutputs().pop();
  }

  public getAllOutputs(): string[] {
    return this.messageSystem.getAllOutputs();
  }

  public resetSimulation(): void {
    this.robot.reset();
    this.messageSystem?.reset();
  }
}
