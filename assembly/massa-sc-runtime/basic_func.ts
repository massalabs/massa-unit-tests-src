import { generateEvent } from "@massalabs/massa-as-sdk";

export function ping(message: string): void {
    generateEvent(message);
}
