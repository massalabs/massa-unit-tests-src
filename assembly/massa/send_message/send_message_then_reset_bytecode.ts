/** ***********************
 * Smart contract that deploy some SC containing a message handler
 * function and sends an asynchronous message to that same SC
 * Note that the message handler SC is reset just after the deploy (as we want to test this edge case)
 **/

import {sendMessage, print, createSC, getOpKeys, getOpData, setBytecodeOf, generateEvent} from "@massalabs/massa-as-sdk"

export function main(name: string): void {
    // Create every SC available in the ExecuteSC operation datastore
    // Send an asynchronous message to every created SC
    const keys = getOpKeys();
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        generateEvent(`sc created at address: ${address}`); // DO NOT REMOVE - used in functional test
        const message = new StaticArray<u8>(4).fill(42, 0, 4);
        sendMessage(address, "receive", 1, 1, 20, 20, 3_000_000, 1, 100, message);
        // sendMessage(address, "receive", 1, 1, 20, 20, 3_000_000, 1, 9000000000, message);
        // reset bytecode of freshly deployed SC
        setBytecodeOf(address, new StaticArray<u8>(0));
        // setBytecodeOf(address, new StaticArray<u8>(3200).fill(0));
    });
    print("receivers created and messages sent");
}