import { generateEvent, print, validateAddress, evmGetAddressFromPubkey, evmGetPubkeyFromSignature, isEvmSignatureValid, Address, transferCoins, Storage, isAddressEoa, keccak256, sendMessage } from '@massalabs/massa-as-sdk';
import { Args, bytesToString, stringToBytes } from "@massalabs/as-types";
import { env } from '@massalabs/massa-as-sdk/assembly/env';

export function main(_args: string): void {}

function testGenerateBigEvent(): void {
    let event_msg = 'big_event: ' + 'a'.repeat(2048);
    generateEvent(event_msg);
}

function hexStringToStaticArray(hex: string): StaticArray<u8> {
    let length = hex.length / 2;
    let result = new StaticArray<u8>(length);
    for (let i = 0; i < length; i++) {
        let byte = parseInt(hex.substr(i * 2, 2), 16);
        result[i] = byte as u8;
    }
    return result;
}

function testEVMAbis(): void {
    let message_str = "test";
    let message_ = stringToBytes(message_str);
    let prefix_str = "\x19Ethereum Signed Message:\n" + message_.length.toString();
    let to_hash = stringToBytes(prefix_str + message_str);
    let full_hash = keccak256(to_hash);
    
    let signatureHexString = "d0d05c35080635b5e865006c6c4f5b5d457ec342564d8fc67ce40edc264ccdab3f2f366b5bd1e38582538fed7fa6282148e86af97970a10cb3302896f5d68ef51b";
    let signature = hexStringToStaticArray(signatureHexString);
    let pubkeyFromSignature = evmGetPubkeyFromSignature(full_hash, signature);
    let address = evmGetAddressFromPubkey(pubkeyFromSignature);

    Storage.set('testEVMAbis1', bytesToString(pubkeyFromSignature));
    Storage.set('testEVMAbis2', bytesToString(address));
    Storage.set('testEVMAbis3', 
        isEvmSignatureValid(full_hash, signature, pubkeyFromSignature) ? 'true' : 'false'
    );
    
    generateEvent('testEVMAbis1' + bytesToString(pubkeyFromSignature));
    generateEvent('testEVMAbis2' + bytesToString(address));
    let sig_valid =   isEvmSignatureValid(full_hash, signature, pubkeyFromSignature) ? 'true' : 'false';
    generateEvent('testEVMAbis3' + sig_valid);
}

function testAsyncMessages(args: Args): void {
    let address_str = args.nextString().expect('Missing address argument.');
    let address = new Address(address_str);
    let functionName = args.nextString().expect('Missing function name argument.');
    
    let start_period = args.nextU64().expect('Missing start_period argument.');
    let start_thread = args.nextU8().expect('Missing start_thread argument.');
    let end_period = args.nextU64().expect('Missing end_period argument.');
    let end_thread = args.nextU8().expect('Missing end_thread argument.');

    let max_gas = args.nextU64().expect('Missing max_gas argument.');
    let fee = args.nextU64().expect('Missing fee argument.');
    let coins = args.nextU64().expect('Missing coins argument.');

    let params = args.nextBytes();
    if (params.isOk()) {
        sendMessage(address, functionName, start_period, start_thread, end_period, end_thread, max_gas, fee, coins, params.unwrap());
    } else {
        let params_def = new StaticArray<u8>(0);
        sendMessage(address, functionName, start_period, start_thread, end_period, end_thread, max_gas, fee, coins, params_def);
    }
}

function testSCTransfer(args: Args): void {
    let to_str = args.nextString().expect('Missing to argument.');
    let amount = args.nextU64().expect('Missing amount argument.');
    let to = new Address(to_str);
    transferCoins(to, amount);
}

/*function testWasmV1Abis(): void {
    // ...
}*/

export function VersioningStressTestCall(_args: StaticArray<u8>): void {
  let args = new Args(_args);
  const mode = args.nextU64().expect('Missing mode argument.');

  if (mode == 0) {
    testGenerateBigEvent();
  } else if (mode == 1) {
    testEVMAbis();
  } else if (mode == 2) {
    testAsyncMessages(args);
  } else if (mode == 3) {
    testSCTransfer(args);
  } else if (mode == 4) {
    //testWasmV1Abis();
  } else if (mode == 5) {

  } else if (mode == 6) {

  } else if (mode == 7) {

  } else if (mode == 8) {

  }





}
