import { print, call, Address, Args } from "@massalabs/massa-as-sdk";

export function main(_args: string): i32 {
  let addr = new Address("get_string");
  let args = new Args();
  args.add("you");
  let string_from = call(addr, "helloName", args, 0);
  print(string_from.toString());
  return 0;
}
