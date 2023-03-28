/** ****************************
 * Bytecode to send to the massa network that push the `helloworld`
 * smartcontract.
 *
 * N.B. The entry file of your Massa Smart Contract program should be named
 * `src/main.ts`, the command `yarn bundle` will produce an `build/main.wasm`
 * which is ready to be send on Massa network node!
 **/

import { createSC, generateEvent, getOpData, getOpKeys, print } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    // Create every SC available in the ExecuteSC operation datastore
    const keys = getOpKeys();
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        generateEvent(address.toString());
        print("main:" + address.toString());
    });

}
