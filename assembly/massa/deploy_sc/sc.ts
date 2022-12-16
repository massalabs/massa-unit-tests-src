import { callerHasWriteAccess, generateEvent } from "@massalabs/massa-as-sdk";

export function constructor(): void {
    if (callerHasWriteAccess()) {
        generateEvent("constructor called by deployer");
    } else {
        generateEvent("constructor called by unauthorized address");
    }
}

export function ping(): void {
    generateEvent("pong");
}