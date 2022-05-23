require('dotenv').config()

const { ethers } = require('hardhat')

// Basic create contract (factory pattern), get Contract and call internal function Collection with her parameters
// Return Tx hash
async function Collection (name, symbol) {
  const FactoryNFT = await ethers.getContractFactory('FactoryNFT')
  const result = await FactoryNFT.attach(process.env.CONTRACT_ADDRESS).Collection(name, symbol)
  console.log('Collection created')
  return (result.hash)
}

module.exports.Collection = Collection
