import { Args, bytesToString } from "@massalabs/as-types";
import { generateEvent, Context, deferredCallRegister, deferredCallExists, getOpKeys, getOpData, createSC } from "@massalabs/massa-as-sdk";



export function main(name: string): void {
    const keys = getOpKeys();
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        generateEvent(address.toString());
    });

}


export function exists(args: StaticArray<u8>): void {
    let id = bytesToString(args);
    generateEvent(id);
    let r = deferredCallExists(id);
    generateEvent(r.toString());
}