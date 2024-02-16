// import {readFileSync, writeFile} from "fs";
import path from "path";
import {fileURLToPath} from "url";

import {Args, Client, fromMAS, IContractData, IReadData, ITransactionData} from "@massalabs/massa-web3";
import {getClient, deploySc, pollEvents, okStatusOrThrow, getScAddressFromEvents} from "./utils";
import {readFileSync} from "fs";
// import keccak256 from "@indeliblelabs/keccak256";

const DEFAULT_MAX_GAS = 70_000_000n;

// globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
// const deployDb: string = "deployed.json";

async function main() {
    // main entry function

    const {client, account, chainId} = await getClient();

    let node_status = await client.publicApi().getNodeStatus();
    console.log("Account:", account);
    console.log("Node status:", node_status);

    // Test transaction
    /*
    {
        let txData = {
            fee: BigInt(0),
            amount: fromMAS(305),
            recipientAddress: "AU12o4xrpyL6mobLpuoJevPRbHXnJJRUJC5FyDwjQdhuxcPoTwz3h",
        };
        let [operationId0] = await client.wallet().sendTransaction(txData);
        console.log("operationId 0:", operationId0);
        // console.log("send transaction res:", res);
        let [opStatus0, events0] = await pollEvents(client, operationId0, true);
        okStatusOrThrow(opStatus0);
        console.log("[main] operation status", opStatus0);
        // console.log("[main] events:", events0);
    }
    */

    // Initial SC coins (for gas / coins estimation)
    const coins = fromMAS(1);
    const toDeploy = path.join(__dirname, 'build', 'massa', 'execution_trace.wasm')

    let operationId = await deploySc(
        account,
        chainId,
        toDeploy,
        coins,
        new Args()
    );

    console.log("operationId:", operationId);
    let [opStatus, events] = await pollEvents(client, operationId, true);
    console.log("[main] events:", events);
    okStatusOrThrow(opStatus);

    let scAddr = getScAddressFromEvents(events);
    console.log("[main] sc address:", scAddr);

    let operationId1 = await callScFunc(client, scAddr, "main", DEFAULT_MAX_GAS, fromMAS(0.1));
    console.log("operationId 1:", operationId1);
    let [opStatus1, events1] = await pollEvents(client, operationId1, true);
    console.log("[main] SC call events:", events1);
    okStatusOrThrow(opStatus1);

    process.exit(0);
}

main();

async function callScFunc(client: Client, scAddr: string, functionName: string, maxGas: bigint = DEFAULT_MAX_GAS, coins = 0n) {

    const deployerAccount = client.wallet().getBaseAccount()!;
    const operationId = await client.smartContracts().callSmartContract(
        {
            fee: 0n,
            maxGas: maxGas,
            // coins: 1_000_000_000n,
            coins: coins,
            targetAddress: scAddr,
            functionName: functionName,
            parameter: new Args().serialize(),
        },
        deployerAccount,
    );

    return operationId
}
