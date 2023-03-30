/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import {Storage, getKeys, getKeysOf, generateEvent, Context, print} from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    // Simple test
    const key1: StaticArray<u8> = [1, 0, 4, 255];
    const key2: StaticArray<u8> = [15, 230, 12, 2];
    const value1: StaticArray<u8> = [21, 0, 49];
    const value2: StaticArray<u8> = [42, 0, 48];
    Storage.set(key1, value1);
    Storage.set(key2, value2);
    Storage.del(key2);

    let keys = getKeys([]);
    let msg = `keys: ${keys}`;
    // print(msg);
    generateEvent(msg);
    assert(keys.length == 1);

    let addr = Context.callee().toString();
    let keys2 = getKeysOf(addr, []);
    let msg2 = `keys2: ${keys2}`;
    // print(msg2);
    generateEvent(msg2);
    assert(keys2.length == 1);

    // Test using key prefixes
    const key3: StaticArray<u8> = [2, 0, 254, 255];
    const value3: StaticArray<u8> = [5, 12, 241];
    Storage.set(key3, value3);

    let keys_f = getKeys([2, 0]);
    let msg_f = `keys_f: ${keys_f}`;
    // print(msg_f);
    generateEvent(msg_f);
    assert(keys_f.length == 1);

    let keys2_f = getKeysOf(addr, [1, 0, 4]);
    let msg2_f = `keys2_f: ${keys2_f}`;
    // print(msg2_f);
    generateEvent(msg2_f);
    assert(keys2_f.length == 1);
}

