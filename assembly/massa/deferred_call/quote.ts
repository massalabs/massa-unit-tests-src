import { generateEvent, deferredCallQuote, Slot } from "@massalabs/massa-as-sdk";



export function main(name: string): void {
    let slot = new Slot(10, 5);
    let amount = deferredCallQuote(slot, 300000, 1000);
    generateEvent(amount.toString());
}

