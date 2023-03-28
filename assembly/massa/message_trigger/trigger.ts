import { stringToBytes } from "@massalabs/as-types";
import { Context, generateEvent, Storage } from "@massalabs/massa-as-sdk";

export function main(_args: StaticArray<u8>): void {
    generateEvent(`Trigger on ${Context.callee().toString()}`);
    Storage.set(stringToBytes("test2"), stringToBytes("test"));
    return;
}