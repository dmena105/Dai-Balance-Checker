import React, { useState } from "react";
import CurrencyFormat from 'react-currency-format';

const Web3 = require('web3')
const daiABI = require("./abi/dai")

const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"

const provider = new Web3.providers.HttpProvider("https://cloudflare-eth.com/")
const web3 = new Web3(provider)

const App = () => {

  const [address, setAddress] = useState("")
  const [statusMessage, setStatusMessage] = useState({ message: "" })
  const [balance, setBalance] = useState("")


  const getDaiBalance = async (address) => {
    const daiContract = new web3.eth.Contract(daiABI, daiContractAddress)
    const daiBalance = await daiContract.methods.balanceOf(address).call()
    return web3.utils.fromWei(daiBalance)
  }

  const checkBalance = async (event) => {
    if (web3.utils.isAddress(address)) {
      setStatusMessage({ message: "Success!" })
      const daiBalance = await getDaiBalance(address)
      setBalance(daiBalance)
    } else {
      setStatusMessage({ message: "Try Agian, did not recognized the address." })
    }
  }

  return (
    <div>
      <div>
        Dai Balance Checker
      </div>
      <div>Sample Adress: 0xa1D8d972560C2f8144AF871Db508F0B0B10a3fBf</div>
      <div>
        {statusMessage.message}
      </div>

      <div>
        <input
          type="text"
          placeholder="ETH Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div>
        <button
          onClick={checkBalance}>
          Check Balance</button>
      </div>
      <div>Dai Balance:
                {balance === "" ? (balance) :
          (<CurrencyFormat value={balance} displayType={'text'} thousandSeparator={true} prefix={'$'} />)
        }
      </div>
    </div>
  )
}

export default App;
