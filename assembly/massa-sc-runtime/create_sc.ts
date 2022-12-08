import { createSC, getOpData, getOpKeys, print } from "@massalabs/massa-as-sdk";

export function main(_args: string): i32 {
    // Create every SC available in the ExecuteSC operation datastore
    const keys = getOpKeys();
    keys.forEach(function (key) {
        const bytecode = getOpData(key);
        const address = createSC(bytecode);
        print(address.toByteString());
    });
    return 0;
}
