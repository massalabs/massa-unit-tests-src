/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { Storage, getKeys, getKeysOf, generateEvent, Context, print } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {

    const key1: StaticArray<u8> = [1, 0, 4, 255];
    const key2: StaticArray<u8> = [2, 0, 254, 255];
    const value1: StaticArray<u8> = [21, 0, 49];
    const value2: StaticArray<u8> = [42, 0, 48];
    Storage.set(key1, value1);
    Storage.set(key2, value2);
    Storage.del(key2);

    let keys = getKeys();
    let msg = `keys: ${keys}`;
    // print(msg);
    generateEvent(msg);

    let addr_ = Context.callee();
    let addr = addr_.toString();
    let keys2 = getKeysOf(addr);
    let msg2 = `keys2: ${keys2}`;
    // print(msg2);
    generateEvent(msg2);
}

