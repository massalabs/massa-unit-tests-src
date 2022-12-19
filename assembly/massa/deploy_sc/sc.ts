import { callerHasWriteAccess, generateEvent } from "@massalabs/massa-as-sdk";

export function constructor(_args: StaticArray<u8>): void {
    if (callerHasWriteAccess()) {
        generateEvent("constructor called by deployer");
    } else {
        generateEvent("constructor called by unauthorized address");
    }
}

export function ping(_args: StaticArray<u8>): void {
    generateEvent("pong");
}