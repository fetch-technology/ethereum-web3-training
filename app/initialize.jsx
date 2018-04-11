import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const web3 = window.web3

class App extends Component {

  fetchContractData(e) {
    e.preventDefault()

    Promise.all([
      fetch('/contracts_Voting_sol_Ballot.abi').then(resp => resp.json()),
      fetch('/contracts_Voting_sol_Ballot.bin').then(resp => resp.text())
    ]).then(([abi, bytecode]) => {
      const VotingContract = web3.eth.contract(abi)

      /* VotingContract.new(['Germany', 'Brazil'], {
       *   data: bytecode
       * }, (error, contract) => {
       *   console.log(error, contract)
       * }) */

      const contract = VotingContract.at("0xd48db4ec33acd07a2a929220cf128432f9c6fe08")
      /* contract.chairperson((error, address) => console.log(address)) */
      /* contract.giveRightToVote("0xf27791C9FBA15506b93E34c5641223E9932d9f52", (error, resp) => {
       *   console.log(error, resp)
       * }) */
      contract.voters("0xf27791C9FBA15506b93E34c5641223E9932d9f52", (error, voters) => console.log(error, voters))
      /* contract.vote(0, (error, resp) => console.log(error, resp)) */
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.fetchContractData}>Fetch contract data</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
