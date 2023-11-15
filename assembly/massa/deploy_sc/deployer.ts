import { generateEvent, getOpKeys, getOpData, createSC, call, functionExists } from "@massalabs/massa-as-sdk";
import { Args } from '@massalabs/as-types';

export function main(): void {
    const keys = getOpKeys();

    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        generateEvent("sc created");

        if (functionExists(address, "constructor")) {
            generateEvent("constructor exists and will be called");
            call(address, "constructor", new Args(), 0);
        }

        generateEvent("sc created at address: " + address.toString());
    });
}
