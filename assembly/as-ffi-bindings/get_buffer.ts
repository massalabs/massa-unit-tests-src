export function get_buffer(): StaticArray<u8> {
  return [1, 3, 3, 255];
}

// Same as get_buffer but with odd size
export function get_buffer_2(): StaticArray<u8> {
  return [1, 3, 3, 254, 255];
}
