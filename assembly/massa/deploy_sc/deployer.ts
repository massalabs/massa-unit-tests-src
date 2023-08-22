import { generateEvent, getOpKeys, getOpData, createSC, call, functionExists } from "@massalabs/massa-as-sdk";
import { Args } from '@massalabs/as-types';

export function main(): void {
    const keys = getOpKeys(new StaticArray<u8>(0));

    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        generateEvent("sc created");

        if (functionExists(address, "constructor")) {
            generateEvent("constructor exists and will be called");
            call(address, "constructor", new Args(), 0);
        }
    });
}
