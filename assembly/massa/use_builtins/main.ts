// Little test to see if all builtins that we support are available in the runtime
export function main(): void {
    seed();
    Date.now();
    abort("Manual abort with date and rnd", "use_builtins.ts");
}
