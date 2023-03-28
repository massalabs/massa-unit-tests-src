import { generateEvent, Context } from "@massalabs/massa-as-sdk";

export function test(param: StaticArray<u8>): void {
    generateEvent("Caller_Address : " + Context.caller().toString() + " || tokens sent to the SC during the call : " + Context.transferredCoins().toString());
}