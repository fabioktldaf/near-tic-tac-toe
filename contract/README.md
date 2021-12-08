# tic-tac-toe Smart Contract

A [smart contract] written in [AssemblyScript] for an app initialized with [create-near-app]

# Quick Start

Before you compile this code, you will need to install [Node.js] ≥ 12

# Deploy

near create-account tictactoe.f-a-b-i-o.testnet --masterAccount f-a-b-i-o.testnet

near deploy --contractName=tictactoe.f-a-b-i-o.testnet --keyPath=~/.near-credentials/testnet/f-a-b-i-o.testnet.json --wasmFile=./build/release/tic-tac-toe.wasm

# Exploring The Code

1. The main smart contract code lives in `assembly/index.ts`. You can compile
   it with the `./compile` script.
2. Tests: You can run smart contract tests with the `./test` script. This runs
   standard AssemblyScript tests using [as-pect].

[smart contract]: https://docs.near.org/docs/develop/contracts/overview
[assemblyscript]: https://www.assemblyscript.org/
[create-near-app]: https://github.com/near/create-near-app
[node.js]: https://nodejs.org/en/download/package-manager/
[as-pect]: https://www.npmjs.com/package/@as-pect/cli
