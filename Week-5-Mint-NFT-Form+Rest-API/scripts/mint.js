require('dotenv').config()

const { ethers } = require("hardhat");
const { CONTRACT_ADDRESS } = process.env

//Basic Mint, get Contract and call internal function Fmint with her parameters
//Return Tx hash
async function Fmint(index, wallet, supply, metadata) {
      const FactoryNFT = await ethers.getContractFactory("FactoryNFT")
      const result = await FactoryNFT.attach(CONTRACT_ADDRESS).Fmint(index, wallet, supply, metadata)

      console.log("Minted to: ", wallet)
      return(`| Transaction hash: ${result.hash} | 
      | Transaction url: https://mumbai.polygonscan.com/tx/${result.hash} |`)
}

module.exports.Fmint = Fmint