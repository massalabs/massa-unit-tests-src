// Little test to see if all AS builtins that we support are available in the runtime
export function main(): void {

    seed();
    let now: i64 = Date.now();
    console.log("Hello there!");
    console.debug("I'm debug msg");
    console.info("i am info msg");
    console.warn("Care, i'm warning");
    console.error("something went wrong");

    // trace
    trace("foo");
    trace("one arg:", 1, 5.0);
    trace("three args:", 3, 1.0, <f64>2, 3);
    trace("three args:", 4, 1.0, <f64>2, 3, 4);
    trace("three args:", 5, 1.0, <f64>2, 3, 4, 5);

    // time functions
    // Note for dev: for now process.time() use Date.now() which is expected to return a f64
    //               as soon as we upgrade to AS 0.22+, we should change to return a i64 thus
    //               making the following line compiles ok
    // let t: i64 = process.time();

    // abort - it should end the program
    abort("Manual abort. 'Date.now' UTC timestamp (ms) = " + now.toString(), "use_builtins.ts");
}
