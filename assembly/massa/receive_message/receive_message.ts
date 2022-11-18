/** ***********************
 * Smart contract containing a message handler function
 **/

import { print, generateEvent } from "@massalabs/massa-as-sdk"

export function receive(data: StaticArray<u8>): void {
    let response: string = "message correctly received: " + data.toString();
    generateEvent(response);
    print(response);
}
