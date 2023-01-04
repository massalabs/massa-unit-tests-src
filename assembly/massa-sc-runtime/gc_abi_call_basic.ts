/*
 * Gas calibration: the most basic unit test for abi call
*/
import { print } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    let i = _args.length;
    print(_args);
    print("CCCC");
}