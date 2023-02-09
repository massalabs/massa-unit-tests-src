// Test to check that AS builtin process.hrtime() can be compiled but is unsupported in massa-sc-runtime

export function main(_args: string): void {
       // Note: hrtime obtains the system's monotonic high resolution time
    //       this is not compatible with deterministic execution so we do not support it
    let hrt: u64 = process.hrtime();
}
