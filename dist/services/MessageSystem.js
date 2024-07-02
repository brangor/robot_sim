"use strict";
// src/services/MessageSystem.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSystem = void 0;
class MessageSystem {
    constructor() {
        this.messageQueue = [];
        this.messageHistory = [];
        this.writableStream = process.stdout;
    }
    async enqueueMessage(message) {
        this.messageQueue.push(message);
        await this.processMessages();
        this.messageHistory.push(message);
    }
    getLatestSentMessage() {
        if (this.messageHistory.length === 0) {
            return undefined;
        }
        return this.messageHistory[this.messageHistory.length - 1];
    }
    async processMessages() {
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            if (message) {
                await this.printMessage(message);
            }
        }
    }
    async printMessage(message) {
        return new Promise((resolve, reject) => {
            this.writableStream.write(`${message}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    reset() {
        this.messageQueue = [];
        this.messageHistory = [];
    }
    getAllOutputs() {
        return [...this.messageQueue];
    }
}
exports.MessageSystem = MessageSystem;
