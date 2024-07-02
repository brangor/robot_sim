// src/util/message.ts

import type { Message, MessageKind } from "../types/Types";

function createMessage(kind: MessageKind, message: string): Message {
	return {
		kind: kind,
		message,
		timestamp: Date.now()
	};
}

export function createInfoMessage(message: string): Message {
	return createMessage("INFO" as MessageKind, message);
}
