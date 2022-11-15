/*
 * Gas calibration: the most basic unit test for ops
*/

import { print } from "@massalabs/massa-as-sdk";

export function main(_args: string): u32 {
    let a = 1;
    let b = 2;
    let c = a + b;
    // print(`${a} + ${b} == ${c}`);
    return c;
}
