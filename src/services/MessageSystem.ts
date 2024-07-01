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
          //skip it for now
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

  public reset(): void {
    this.messageQueue = [];
    this.processing = false;
  }

  public getAllOutputs(): MessageType[] {
    return [...this.messageQueue];
  }
}
