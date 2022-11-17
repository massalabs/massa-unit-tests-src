/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { Storage } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    const key1 = new StaticArray<u8>(4).fill(1, 0, 4);
    const key2 = new StaticArray<u8>(4).fill(2, 0, 4);
    const value1 = new StaticArray<u8>(4).fill(21, 0, 4);
    const value2 = new StaticArray<u8>(4).fill(42, 0, 4);
    Storage.set(key1, value1);
    Storage.set(key2, value2);
    Storage.del(key2);
}
