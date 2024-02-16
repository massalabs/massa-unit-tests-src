import {
    Args,
    Client,
    ClientFactory, DefaultProviderUrls,
    EOperationStatus,
    IAccount,
    IEvent,
    IReadData,
    WalletClient
} from "@massalabs/massa-web3";
import {deploySC} from "@massalabs/massa-sc-deployer";
import {readFileSync} from "fs";
import {config} from "dotenv-safe";

config({
    path: `.env`,
    example: `.env.example`,
});

export const getClient = async (): Promise<{
    client: Client;
    account: IAccount;
    chainId: bigint;
}> => {
    if (!process.env.WALLET_SECRET_KEY) {
        throw new Error("WALLET_SECRET_KEY env variable is not set");
    }
    if (!process.env.MASSA_CHAIN_ID) {
        throw new Error("MASSA_CHAIN_ID env variable is not set");
    }
    const account = await WalletClient.getAccountFromSecretKey(
        process.env.WALLET_SECRET_KEY,
    );
    console.log('Using account:', account.address);
    const chainId = BigInt(process.env.MASSA_CHAIN_ID);

    return {
        client: await ClientFactory.createDefaultClient(
            process.env.JSON_RPC_URL_PUBLIC as DefaultProviderUrls,
            chainId,
            false,
            account,
        ),
        account,
        chainId
    };
};

export async function deploySc(account: IAccount, chainId: bigint, scPath: string, coins: bigint, args: Args): Promise<string> {
    const deploy_sc = await deploySC(
        process.env.JSON_RPC_URL_PUBLIC!,
        account,
        [
            {
                data: readFileSync(scPath),
                // Storage cost
                coins: coins,
                args: args,
            },
        ],
        chainId,
        0n, // fees
        3980167295n, // max gas
        false, // wait for the first event to be emitted and print it into the console.
    );
    return deploy_sc.opId;
}

export async function pollEvents(client: Client, operationId: string, final: boolean = false): Promise<[EOperationStatus, IEvent[]]> {

    let result = EOperationStatus.NOT_FOUND;

    const finalSuccess = client
        .smartContracts()
        .awaitRequiredOperationStatus(operationId, EOperationStatus.FINAL_SUCCESS);

    const finalError = client
        .smartContracts()
        .awaitRequiredOperationStatus(operationId, EOperationStatus.FINAL_ERROR);

    const finalResult = await Promise.race([finalSuccess, finalError]);
    // console.log("[pollEvents] status returned:", EOperationStatus[finalResult]);
    result = finalResult;

    const events: IEvent[] = await client
        .smartContracts()
        .getFilteredScOutputEvents({
            emitter_address: null,
            start: null,
            end: null,
            original_caller_address: null,
            original_operation_id: operationId,
            is_final: final,
        });
    // console.log("[pollEvents] events:", events);

    return [result, events]
}

export function okStatusOrThrow(status: EOperationStatus, context: string = "") {
    if (status != EOperationStatus.FINAL_SUCCESS) {
        throw new Error(`Speculative error or final error (status: ${status.toString()}), context: ${context}`);
    }
}

export function getScAddressFromEvents(events: IEvent[]): string {
    const deployedSCEvent = events?.find((e) =>
        e.data.includes('Contract deployed at address'),
    );

    if (!deployedSCEvent) {
        throw new Error('failed to retrieve deploy address');
    }

    return deployedSCEvent.data.substring(
        'Contract deployed at address: '.length,
        deployedSCEvent.data.length,
    );
}

/*
export async function needDeploy(client: Client, scAddr: string, toDeployHash: Uint8Array): Promise<boolean> {

    let readData: IReadData = {
        maxGas: BigInt(10_000_000),
        targetAddress: scAddr,
        targetFunction: "getDeployedBytecodeHash",
        parameter: new Args().serialize(),
    }
    const resp = await client.smartContracts().readSmartContract(readData);
    // console.log("resp", resp);
    const deployedHash = new Args(resp.returnValue).nextUint8Array();
    // console.log(`deployedHash: ${deployedHash}`);
    // console.log(`toDeployedHash: ${toDeployHash}`);

    return !compareFunc(toDeployHash, deployedHash);
}

const compareFunc = (a: Uint8Array, b: Uint8Array) =>
    a.length === b.length &&
    a.every((element, index) => element === b[index]);

export function strToBytes(str: string): Uint8Array {
    if (!str.length) {
        return new Uint8Array(0);
    }
    return new Uint8Array(Buffer.from(str, 'utf-8'));
}

export async function getDynamicCosts(
    client: Client,
    targetAddress: string,
    targetFunction: string,
    parameter: number[],
): Promise<[bigint, number]> {

    const MAX_GAS = 4294967295; // Max gas for an op on Massa blockchain
    const gas_margin = 1.2;
    let estimatedGas: bigint = BigInt(MAX_GAS);
    const prefix = "Estimated storage cost: ";
    let estimatedStorageCost: number = 0;
    const storage_cost_margin = 1.1;

    try {
        const readOnlyCall = await client.smartContracts().readSmartContract({
            targetAddress: targetAddress,
            targetFunction: targetFunction,
            parameter,
            maxGas: BigInt(MAX_GAS),
        });
        // console.log("readOnlyCall:", readOnlyCall);
        // console.log("events", readOnlyCall.info.output_events);
        // console.log("===");

        estimatedGas = BigInt(Math.min(Math.floor(readOnlyCall.info.gas_cost * gas_margin), MAX_GAS));
        let filteredEvents = readOnlyCall.info.output_events.filter((e) => e.data.includes(prefix));
        // console.log("filteredEvents:", filteredEvents);
        estimatedStorageCost = Math.floor(
            parseInt( filteredEvents[0].data.slice(prefix.length) , 10) * storage_cost_margin
        );

    } catch (err) {
        console.log(
            `Failed to get dynamic gas cost for ${targetFunction} at ${targetAddress}. Using fallback value `,
            err,
        );
    }
    return [estimatedGas, estimatedStorageCost];
}
*/
