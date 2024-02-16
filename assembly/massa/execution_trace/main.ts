import {generateEvent, chainId, transferCoins, Address} from "@massalabs/massa-as-sdk";

export function main(): void {

    let chain_id = chainId();
    generateEvent(`Chain id: ${chain_id}`);

    let to = new Address("AU12o4xrpyL6mobLpuoJevPRbHXnJJRUJC5FyDwjQdhuxcPoTwz3h");
    let amount = 2000;
    transferCoins(to, amount);
}
