/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { getOpData, getOpKeys, Storage, setBytecode } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    // Store every SC available in the ExecuteSC operation datastore overriding the previous one
    const keys = getOpKeys(new StaticArray<u8>(0));
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        setBytecode(bytecode);
    });
}
