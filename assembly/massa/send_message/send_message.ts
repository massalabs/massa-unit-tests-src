/** ***********************
 * Smart contract that pushes a SC containing a message handler
 * function and sends an asynchronous message to that same SC
 **/

import { sendMessage, print, createSC, fileToBase64 } from "@massalabs/massa-as-sdk"

export function main(name: string): void {

    const bytes = fileToBase64('./build/massa/receive_message.wasm');
    const address = createSC(bytes);
    sendMessage(address, "receive", 1, 1, 20, 1, 100_000, 1, 100, "hello my good friend!");
    print("receiver created and message sent")
}
