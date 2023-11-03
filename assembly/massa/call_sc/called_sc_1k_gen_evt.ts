/** ***********************
 * Smart contract containing a message handler function
 **/

import { generateEvent } from "@massalabs/massa-as-sdk";

export function receive(data: StaticArray<u8>): void {
  const response: string = "message correctly received: " + data.toString();

  for (let i = 0; i < 1000; i++) {
    generateEvent(response);
  }
}
