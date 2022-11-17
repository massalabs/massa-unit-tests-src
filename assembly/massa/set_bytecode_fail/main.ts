/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { fileToBase64, getOpData, getOpKeys, Storage } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    // Store the first SC available in the ExecuteSC operation datastore
    const keys = getOpKeys();
    const bytecode = getOpData(keys[0]);
    Storage.setBytecode(bytecode);
}
