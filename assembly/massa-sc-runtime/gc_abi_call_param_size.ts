import {Storage, print} from "@massalabs/massa-as-sdk";

export function main(_args: string): void {
    Storage.set("TEST", "TEST_VALUE");
    // Storage.set("TEST2", "TEST_VALUE2");
    // Storage.del("TEST2");
    print(_args);
}
