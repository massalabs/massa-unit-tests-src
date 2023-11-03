/** ***********************
 * Smart contract that pushes a SC containing a message handler
 * function and sends an asynchronous message to that same SC
 **/

import { Args } from "@massalabs/as-types";
import {
  call,
  print,
  createSC,
  getOpKeys,
  getOpData,
  generateEvent,
} from "@massalabs/massa-as-sdk";

export function main(name: string): void {
  // Create every SC available in the ExecuteSC operation datastore
  // Send an asynchronous message to every created SC
  const keys = getOpKeys();
  keys.forEach(function (key) {
    const bytecode = getOpData(key);
    const address = createSC(bytecode);
    const message = new StaticArray<u8>(4).fill(42, 0, 4);
    const args = new Args();
    args.add(message);
    print("try to call a sc 1000 times");
    for (let i = 0; i < 1000; i++) {
      generateEvent("call sc " + i.toString());
      call(
        address,
        "receive",
        args,
        1,
      );
    }
  });
  print("receivers created and messages sent");
}
