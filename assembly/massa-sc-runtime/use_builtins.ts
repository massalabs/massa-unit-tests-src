// Little test to see if all builtins that we support are available in the runtime
export function main(): void {
    seed();
    Date.now();
    console.log("Hello there!");
    abort("abord with date and rnd", "use_builtins.ts");
}
