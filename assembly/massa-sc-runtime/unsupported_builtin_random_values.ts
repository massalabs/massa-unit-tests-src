// getRandomValues are not supported because it is not determinist
export function main(_args: string): void {
    const array = new Uint8Array(10);
    //  this is not compatible with deterministic execution so we do not support it
    crypto.getRandomValues(array);
}
