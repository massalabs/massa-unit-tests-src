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
  Context,
  getKeys,
  Storage,
} from "@massalabs/massa-as-sdk";
import { get } from "@massalabs/massa-as-sdk/assembly/std/storage";

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

    // keep this loop so this SC is similar to call_sc_1k_times.ts
    for (let i = 0; i < 1000; i++) {
      print("Gas at iter(" + i.toString() + "): " + Context.remainingGas().toString());
      generateEvent("Gas at iter(" + i.toString() + "): " + Context.remainingGas().toString());
    }

    print("try to call a sc");
    call(address, "receive", args, 1);
    generateEvent("Gas after call: " + Context.remainingGas().toString());
  });
  print("receivers created and messages sent");
}

export function set_data(arg: StaticArray<u8>): void {
  print("set_data called");
  const key: StaticArray<u8> = [0,0,0,0];
  Storage.set(key, arg);
}

// copy of the main function that creates SCs from the Storage instead of the OpDatastore
export function call_sc(name: string): void {
  // Create every SC available in the ExecuteSC operation datastore
  // Send an asynchronous message to every created SC
  const keys = getKeys([]);
  keys.forEach(function (key) {
    print("key: " + key.toString());
    const bytecode = Storage.get(key);
    const address = createSC(bytecode);
    const message = new StaticArray<u8>(4).fill(42, 0, 4);
    const args = new Args();
    args.add(message);

    // keep this loop so this SC is similar to call_sc_1k_times.ts
    for (let i = 0; i < 1000; i++) {
      print("Gas at iter(" + i.toString() + "): " + Context.remainingGas().toString());
      generateEvent("Gas at iter(" + i.toString() + "): " + Context.remainingGas().toString());
    }

    print("try to call a sc");
    call(address, "receive", args, 1);
    generateEvent("Gas after call: " + Context.remainingGas().toString());
  });
  print("receivers created and messages sent");
}

