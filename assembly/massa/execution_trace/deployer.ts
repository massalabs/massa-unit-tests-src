import {
    generateEvent,
    getOpKeys,
    getOpData,
    createSC,
    call,
    functionExists,
    Context,
    balance
} from "@massalabs/massa-as-sdk";
import { Args } from '@massalabs/as-types';

export function main(): void {
    const keys = getOpKeys();

    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        generateEvent("sc created");

        if (functionExists(address, "transfer")) {
            let coins = balance();
            generateEvent(`transfer function exists and will be called with ${coins} coins`);
            call(address, "transfer", new Args(), coins);
        }
    });
}