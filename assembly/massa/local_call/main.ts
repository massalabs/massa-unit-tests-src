import { generateEvent, Args, getOpKeys, getOpData, createSC, localCall } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    generateEvent("event generated before the sc");
    const keys = getOpKeys();
    keys.forEach(function (key) {
        let args = new Args();
        args.add("useless message");
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        localCall(address, "receive", args);
        generateEvent("one local call completed");
    });
    generateEvent("event generated after the sc");
}
