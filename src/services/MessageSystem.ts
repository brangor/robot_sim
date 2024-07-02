// src/services/MessageSystem.ts

import { Writable } from "stream";
import type { Message } from "../types/Types";

export class MessageSystem {
  private messageQueue: string[] = [];
  private messageHistory: string[] = [];
  private writableStream: Writable;

  constructor() {
    this.writableStream = process.stdout;
  }

  public async enqueueMessage(message: string): Promise<void> {
    this.messageQueue.push(message);
    await this.processMessages();
    this.messageHistory.push(message);
  }

  public getLatestSentMessage(): string | undefined {
    if (this.messageHistory.length === 0) {
      return undefined;
    }
    return this.messageHistory[this.messageHistory.length - 1];
  }

  private async processMessages(): Promise<void> {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        await this.printMessage(message);
      }
    }
  }

  public async processingComplete(): Promise<void> {
    await this.processMessages();
  }

  private async printMessage(message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.writableStream.write(`${message}`, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public reset(): void {
    this.messageQueue = [];
    this.messageHistory = [];
  }

  public getAllOutputs(): string[] {
    return [...this.messageQueue];
  }
}
