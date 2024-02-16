import {Address, callerHasWriteAccess, generateEvent, transferCoins} from "@massalabs/massa-as-sdk";

export function constructor(_args: StaticArray<u8>): void {
    /*
    if (callerHasWriteAccess()) {
        generateEvent("constructor called by deployer");
    } else {
        generateEvent("constructor called by unauthorized address");
    }
    */
}

export function transfer(_args: StaticArray<u8>): void {
    generateEvent("transfer");

    let to = new Address("AU12E6N5BFAdC2wyiBV6VJjqkWhpz1kLVp2XpbRdSnL1mKjCWT6oR");
    let amount = 1425;
    transferCoins(to, amount);
}