import { generateEvent, chainId } from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    let chain_id = chainId();
    generateEvent(`Chain id: ${chain_id}`);
}