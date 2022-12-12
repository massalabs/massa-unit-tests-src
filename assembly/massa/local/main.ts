import { generateEvent, Address, Args, local_call } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    let addr = new Address("addr");
    let args = new Args();
    generateEvent("event generated before the sc");
    args.add("param");
    local_call(addr, "unc", args);
    generateEvent("event generated after the sc");
}
