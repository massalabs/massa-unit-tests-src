// Test to see if wasm using thread instructions will be rejected
import { print } from "@massalabs/massa-as-sdk";

export function main(): u8 {
    let ptr = heap.alloc(1);
    store<u8>(ptr, 1);
    let res = atomic.add<u8>(ptr, 2);
    return res;
}
