import { generateEvent, localExecution, getOpKeys, getOpData } from "@massalabs/massa-as-sdk";
import { Args } from '@massalabs/as-types';

export function main(_args: string): void {
    generateEvent("event generated before the sc");
    const keys = getOpKeys();
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        localExecution(bytecode, "func", new Args());
        generateEvent("one local execution completed");
    });
    generateEvent("event generated after the sc");
}
