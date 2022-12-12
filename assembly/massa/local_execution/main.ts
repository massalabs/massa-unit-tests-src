import { generateEvent, Args, localExecution, getOpKeys, getOpData } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    generateEvent("event generated before the sc");
    const keys = getOpKeys();
    keys.forEach(function (key) {
        let args = new Args();
        args.add("useless message");
        const bytecode = getOpData(key);
        localExecution(bytecode, "receive", args);
        generateEvent("one local execution completed");
    });
    generateEvent("event generated after the sc");
}
