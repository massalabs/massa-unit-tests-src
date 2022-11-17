/** ***********************
 * Smart contract that pushes a SC containing a message handler
 * function and sends an asynchronous message to that same SC
 **/

import { sendMessage, print, createSC, getOpKeys, getOpData } from "@massalabs/massa-as-sdk"

export function main(name: string): void {
    // Create every SC available in the ExecuteSC operation datastore
    // Send an asynchronous message to every created SC
    const keys = getOpKeys();
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        const message = new StaticArray<u8>(4).fill(42, 0, 4);
        sendMessage(address, "receive", 1, 1, 20, 20, 100_000, 1, 100, message);
    });
    print("receivers created and messages sent")
}