import { generateEvent, createSC, call, Address, Args, getOpData, toBytes } from "@massalabs/massa-as-sdk";

function createContract(): Address {
    const bytes: StaticArray<u8> = getOpData(toBytes("smart-contract"));
    const sc_address = createSC(bytes);
    return sc_address;
}

export function main(_args: StaticArray<u8>): void {
    const sc_address = createContract();
    call(sc_address, "test", new Args(), 0);
    generateEvent("Created at:" + sc_address.toByteString());
    return;
}