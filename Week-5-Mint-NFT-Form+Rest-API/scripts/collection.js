require('dotenv').config()

const { ethers } = require("hardhat");
const { CONTRACT_ADDRESS } = process.env

//Basic create contract (factory pattern), get Contract and call internal function Collection with her parameters
//Return Tx hash
async function Collection(name, symbol) {
      const FactoryNFT = await ethers.getContractFactory("FactoryNFT")
      const result = await FactoryNFT.attach(CONTRACT_ADDRESS).Collection(name, symbol)
      console.log("Collection created")
      return(`| Transaction hash: ${result.hash} | 
      | Transaction url: https://mumbai.polygonscan.com/tx/${result.hash} |`)
}

module.exports.Collection = Collection