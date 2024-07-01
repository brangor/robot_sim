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
import { createInfoMessage, createDebugMessage, createErrorMessage } from "../util/message";

import type { CommandInputType, TurningDirection, MessageType } from "../types/Types";

export class CommandProcessor {
  private robot: Robot;
  private table: Table;
  private messageSystem: MessageSystem;
  private commandInputQueue: CommandInputType[] = [];

  constructor(table: Table, robot: Robot, messageSystem: MessageSystem) {
    this.robot = robot;
    this.table = table;
    this.messageSystem = messageSystem;
  }

  async process(commandInput: CommandInputType): Promise<void> {
    this.commandInputQueue.push(commandInput);
    if (this.commandInputQueue.length === 1) {
      await this.processNextCommand();
    }
  }

  private async processNextCommand(): Promise<void> {
    if (this.commandInputQueue.length === 0) return;

    const nextCommand = this.commandInputQueue.shift();
    if (!nextCommand) return;

    const type = nextCommand.command;
    let command: Command | undefined;

    switch (type) {
      case "PLACE":
        if (!nextCommand.arg) {
          await this.messageSystem.enqueueMessage(
            createDebugMessage("Invalid PLACE command. Ignoring...")
          );
          break;
        }

        command = new PlaceCommand(getPlacementFromArg(nextCommand.arg));
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

    await this.processNextCommand();
  }

  public getLatestOutput(): MessageType | undefined {
    return this.messageSystem.getAllOutputs().pop();
  }

  public getAllOutputs(): MessageType[] {
    return this.messageSystem.getAllOutputs();
  }

  public resetSimulation(): void {
    this.robot.reset();
    this.messageSystem.reset();
  }
}
