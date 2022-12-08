import { generateEvent, call, Address, Args } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    let addr = new Address("invalid_addr");
    let args = new Args();
    generateEvent("event generated before the sc failure");
    args.add("invalid_param");
    call(addr, "invalid_func", args, 42);
    generateEvent("event generated after the sc failure");
}
