# massa-unit-tests-src

A collection of SC for unit testing massa & massa-sc-runtime

## Setup

`
npm install
`

## Build

### Build all

`
npm run build
`

### Build all for

* Build all for massa-sc-runtime
  * `npm run build_rt`
* Build all for the massa-as-sdk
  * `npm run build_massa`

### Build a specific script

`
npm run build:rt:op_fn
`

#### List all available targets

`
npm run
`

### Specific build 1 (custom section)

cd assembly/massa-sc-runtime
cargo install wasm-custom-section
./generate_wasm_with_custom_section.sh

