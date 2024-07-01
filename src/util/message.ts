// src/util/message.ts

import type { MessageType } from "../types/Types";

function createMessage(type: "INFO" | "ERROR" | "DEBUG", message: string): MessageType {
	return {
		type,
		message,
		timestamp: Date.now()
	};
}

export function createInfoMessage(message: string): MessageType {
	return createMessage("INFO", message);
}

export function createErrorMessage(message: string): MessageType {
	return createMessage("ERROR", message);
}

export function createDebugMessage(message: string): MessageType {
	return createMessage("DEBUG", message);
}
