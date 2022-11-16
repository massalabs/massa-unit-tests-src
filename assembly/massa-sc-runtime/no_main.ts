/* Some users could forget to export a main function and the following code
   could be executed witthout being initialized.
*/

import { print, call, Address, Args } from "@massalabs/massa-as-sdk";

let addr = new Address("jCcqGSAVh9BR5icEk8icdvEqeNZzvsPK4xZK9Fm5PaWFab48X");
let args = new Args();
call(addr, "vote", args, 2000);
print("DB = " + call(addr, "get_db", args, 0));
