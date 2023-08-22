import { generateEvent, getOpKeys, getOpData, createSC, localCall } from "@massalabs/massa-as-sdk";
import { Args } from '@massalabs/as-types';

export function main(_args: string): void {
    generateEvent("event generated before the sc");
    const keys = getOpKeys(new StaticArray<u8>(0));
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        localCall(address, "func", new Args());
        generateEvent("one local call completed");
    });
    generateEvent("event generated after the sc");
}
