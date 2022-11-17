/** ***********************
 * Smart contract that pushes a SC containing a message handler
 * function and sends an asynchronous message to that same SC
 **/

import { sendMessage, print, createSC, fileToBase64 } from "@massalabs/massa-as-sdk"

export function main(name: string): void {
    const bytes = fileToBase64('./build/massa-sc-runtime/receive_message.wasm');
    const address = createSC(bytes);
    const message = new StaticArray<u8>(42);
    for (let i = 0; i < 42; i++) {
        message[i] = i;
    }
    sendMessage(address, "receive", 1, 1, 20, 20, 100_000, 1, 100, message);
    print("receiver created and message sent")
}
