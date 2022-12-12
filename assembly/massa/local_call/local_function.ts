import { balance, generateEvent } from "@massalabs/massa-as-sdk";

export function func(_args: string): void {
    generateEvent(balance().toString());
}