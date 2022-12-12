import { Context, generateEvent, Storage, toBytes } from "@massalabs/massa-as-sdk";

export function main(_args: StaticArray<u8>): void {
    generateEvent(`Trigger on ${Context.callee().toByteString()}`);
    Storage.set(toBytes("test"), toBytes("test"));
    return;
}