"use strict";
// src/util/message.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInfoMessage = createInfoMessage;
function createMessage(kind, message) {
    return {
        kind: kind,
        message,
        timestamp: Date.now()
    };
}
function createInfoMessage(message) {
    return createMessage("INFO", message);
}
