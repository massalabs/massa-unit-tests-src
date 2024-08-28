import { Args } from "@massalabs/as-types";
import { generateEvent, Context, deferredCallRegister } from "@massalabs/massa-as-sdk";



export function main(name: string): void {
    generateEvent("try Deferred call register");
    // we want to book all max async gas, but in the slot 1,10 we already have a deferred call that uses 500 gas
    // so this call will fail
    let r = deferredCallRegister("AS12jc7fTsSKwQ9hSk97C3iMNgNT1XrrD6MjSJRJZ4NE53YgQ4kFV", "receive", 1, 10, 1_000_000_000, [], 100);
    generateEvent(r.toString());
}