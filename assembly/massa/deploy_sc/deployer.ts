import { generateEvent, Args, getOpKeys, getOpData, createSC, call, functionExists } from "@massalabs/massa-as-sdk";

export function main(): void {
    generateEvent("event generated before the sc");
    const keys = getOpKeys();

    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        generateEvent("sc created");

        if (functionExists(address, "constructor")) {
            call(address, "constructor", new Args(), 0);
            generateEvent("constructor called");
        }
    });

    generateEvent("event generated after the sc");
}
