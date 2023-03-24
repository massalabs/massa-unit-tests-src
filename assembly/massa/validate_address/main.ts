import { validateAddress } from '@massalabs/massa-as-sdk';

export function main(_args: string): void {
    let result_ok  = validateAddress('AU12E6N5BFAdC2wyiBV6VJjqkWhpz1kLVp2XpbRdSnL1mKjCWT6oR');
    let result_bad = validateAddress('AUé2E6N5BFAdC2wyiBV6VJjqkWhpz1kLVp2XpbRdSnL1mKjCWT6oR');
}
