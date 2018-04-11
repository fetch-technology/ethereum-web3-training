# Ethereum web app demo

## Requirement

- NodeJS
- Ganache
- MetaMask

## Setup

```sh
npm install
npm run compile
npm start
```

## Scenario

### Building contracts

`npm run compile` will build the contracts to `app/assets/`. It will create
`.bin` and `.abi` files, coresponding to the contract's bytecode and ABI.

You will need to rerun this command everytime you change the contract.

### Loading contract data and initialize the contract

```js
Promise.all([
  fetch('/contracts_Voting_sol_Ballot.abi').then(resp => resp.json()),
  fetch('/contracts_Voting_sol_Ballot.bin').then(resp => resp.text())
]).then(([abi, bytecode]) => {
  const VotingContract = web3.eth.contract(abi)
})
```

### Deploy new instance of the contract

```js
VotingContract.new(['Germany', 'Brazil'], {
  data: bytecode
}, (error, contract) => {
  console.log(error, contract)

  if (contract.address) {
  }
})
```

Note: The callback will be called twice, first is when the contract has been
accepted to a block, and the second time when the block is mined and the
contract has been deployed. The second time the callback is called, contract
will have address. You will need this address to call the contract's method
later.

### Loading already deployed contract

```js
const contract = VotingContract.at("0xd48db4ec33acd07a2a929220cf128432f9c6fe08")
```

### Calling contract's methods

```js
contract.chairperson((error, address) => console.log(address))
```

## License

Copyright 2018 Fetch Technology Pte Ltd.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
