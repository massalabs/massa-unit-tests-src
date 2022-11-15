/*
 * Gas calibration: the most basic unit test for abi call
*/
import { print } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    let count: u64 = 11;
    for (let y: u64 = 0; y < count; ++y) {
        print("foo");
    }
}