import { createSC, fileToBase64 } from "@massalabs/massa-as-sdk";

export function main(_args: string): i32 {
    // Create smart contract "get_string"
    const bytes = fileToBase64('./build/massa-sc-runtime/get_string.wasm');
    createSC(bytes);
    return 0;
}
