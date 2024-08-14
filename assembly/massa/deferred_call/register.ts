import { Args } from "@massalabs/as-types";
import { generateEvent, Context, deferredCallRegister } from "@massalabs/massa-as-sdk";



export function main(name: string): void {
    let r = deferredCallRegister("AS12jc7fTsSKwQ9hSk97C3iMNgNT1XrrD6MjSJRJZ4NE53YgQ4kFV", "receive", 1, 1, 300_000, 10000000000, []);
    generateEvent("Deferred call registered");
    generateEvent(r.toString());
}