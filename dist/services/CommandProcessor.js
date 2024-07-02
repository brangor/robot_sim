"use strict";
// src/services/CommandProcessor.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandProcessor = void 0;
const Command_1 = require("../models/Command");
class CommandProcessor {
    constructor(table, robot, messageSystem) {
        this.commandInputQueue = [];
        this.robot = robot;
        this.table = table;
        this.messageSystem = messageSystem;
    }
    async process(commandInput) {
        const type = commandInput.command;
        if (!type)
            return;
        let command;
        switch (type) {
            case "PLACE":
                if (!commandInput.placement)
                    break;
                command = new Command_1.PlaceCommand(commandInput.placement);
                break;
            case "MOVE":
                command = new Command_1.MoveCommand();
                break;
            case "LEFT":
                command = new Command_1.TurnCommand("LEFT");
                break;
            case "RIGHT":
                command = new Command_1.TurnCommand("RIGHT");
                break;
            case "REPORT":
                command = new Command_1.ReportCommand();
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
    getLatestOutput() {
        return this.messageSystem.getAllOutputs().pop();
    }
    getAllOutputs() {
        return this.messageSystem.getAllOutputs();
    }
    resetSimulation() {
        this.robot.reset();
        this.messageSystem?.reset();
    }
}
exports.CommandProcessor = CommandProcessor;
