import { generateEvent, print, validateAddress } from '@massalabs/massa-as-sdk';

export function main(_args: string): void {
    let result_ok  = validateAddress('AU12E6N5BFAdC2wyiBV6VJjqkWhpz1kLVp2XpbRdSnL1mKjCWT6oR');
    let msg_ok = `result ok: ${result_ok}`;
    // print(msg_ok);
    generateEvent(msg_ok);

    let result_bad = validateAddress('AUé2E6N5BFAdC2wyiBV6VJjqkWhpz1kLVp2XpbRdSnL1mKjCWT6oR');
    let msg_bad = `result bad: ${result_bad}`;
    // print(msg_bad);
    generateEvent(msg_bad);
}
