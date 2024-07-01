// src/services/MessageSystem.ts

import { Writable } from "stream";
import type { MessageType } from "../types/Types";

export class MessageSystem {
  private messageQueue: MessageType[] = [];
  private processing: boolean = false;
  private writableStream: Writable;

  constructor() {
    this.writableStream = process.stdout;
  }

  public async enqueueMessage(message: MessageType): Promise<void> {
    this.messageQueue.push(message);
    await this.processMessages();
  }

  private async processMessages(): Promise<void> {
    if (this.processing) return;

    this.processing = true;
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        if (message.type === "ERROR" || message.type === "DEBUG") {
          // Skip it for now but still remove from the queue
          continue;
        } else {
          await this.printMessage(message.message);
        }
      }
    }
    this.processing = false;
  }

  private async printMessage(message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.writableStream.write(message + "\n", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public async reset(): Promise<void> {
    await this.completeAllMessages();
    this.messageQueue = [];
    this.processing = false;
  }

  public getAllOutputs(): MessageType[] {
    return [...this.messageQueue];
  }

  public async completeAllMessages(): Promise<void> {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        await this.printMessage(message.message);
      }
    }
  }
}
