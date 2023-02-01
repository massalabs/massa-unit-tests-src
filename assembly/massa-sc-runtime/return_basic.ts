export function return_string(): string {
    return "Hello World!";
}

export function return_array(): StaticArray<u8> {
    let array: StaticArray<u8> = [1, 2, 3];
    return array;
}
