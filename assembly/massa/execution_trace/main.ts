import {generateEvent, chainId, transferCoins, Address, currentPeriod, currentThread} from "@massalabs/massa-as-sdk";

export function main(): void {

    let chain_id = chainId();
    generateEvent(`Chain id: ${chain_id}`);

    let period: u64 = currentPeriod();
    let thread: u64 = currentThread();
    generateEvent(`At slot ${period} ${thread}`);

    let to = new Address("AU12o4xrpyL6mobLpuoJevPRbHXnJJRUJC5FyDwjQdhuxcPoTwz3h");
    let amount = 2000;
    transferCoins(to, amount);
}
