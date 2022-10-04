import { print, call, Address } from "@massalabs/massa-as-sdk";

export function main(): void {
  let addr = new Address("get_string");
  let string_from = call(addr, "helloName", "you", 0);
  print(string_from);
}
