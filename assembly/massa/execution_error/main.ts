import { generateEvent, call, Address } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    let addr = new Address("invalid_addr");
    call(addr, "invalid_func", "invalid_param", 42);
    generateEvent("Hello world!");
}
