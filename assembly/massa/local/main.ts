import { generateEvent, Args, local_execution, getOpKeys, getOpData, fromBytes, toBytes } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    generateEvent("event generated before the sc");
    const keys = getOpKeys();
    keys.forEach(function (key) {
        let args = new Args();
        args.add("useless message");
        const bytecode = getOpData(key);
        local_execution(bytecode, "receive", args);
        generateEvent("one local execution completed");
    });
    generateEvent("event generated after the sc");
}
