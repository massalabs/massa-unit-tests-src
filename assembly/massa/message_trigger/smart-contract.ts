import { sendMessage, Context, currentPeriod, currentThread, generateEvent, Address } from "@massalabs/massa-as-sdk";
import { Args, stringToBytes } from '@massalabs/as-types';

export function test(_args: StaticArray<u8>): void {
    let period = currentPeriod();
    let thread = currentThread();
    generateEvent("Triggered");
    sendMessage(Context.callee(), "test", period, thread, period + 30, thread, 10000000, 0, 0, new Args().serialize(), new Address("AU1BXFcS8qUwLKbcc2gmMprp1AjbDR7JFd1WTc82RFdWE1Nho9gN"), stringToBytes("test2"));
}
