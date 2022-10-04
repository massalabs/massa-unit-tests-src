/** ***********************
 * Smart contract containing a message handler function
 **/

import { print } from "@massalabs/massa-as-sdk"

export function receive(data: string): void {
    print("message received: " + data);
}
