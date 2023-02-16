import { generateEvent, Context} from "@massalabs/massa-as-sdk";

export function test(param: StaticArray<u8>): void {      
    generateEvent("Caller_Address : " + Context.caller().toByteString() + " || tokens sent to the SC during the call : " + Context.transferedCoins().toString());  
}