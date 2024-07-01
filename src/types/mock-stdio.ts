// src/types/mock-stdio.d.ts

declare module "mock-stdio" {
  export function start(): void;
  export function stop(): void;
  export function send(input: string): void;
  export function end(): string;
}
