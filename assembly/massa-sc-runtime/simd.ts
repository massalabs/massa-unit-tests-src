// Test to see if wasm using simd instructions will be rejected
import { print } from "@massalabs/massa-as-sdk";

export function main(): v128 {
    let v: v128 = v128(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
    return v;
}
