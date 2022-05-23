require('dotenv').config()

const { ethers } = require('hardhat')

// Basic Mint, get Contract and call internal function Fmint with her parameters
// Return Tx hash
async function Fmint (index, wallet, supply, metadata) {
  const FactoryNFT = await ethers.getContractFactory('FactoryNFT')
  const result = await FactoryNFT.attach(process.env.CONTRACT_ADDRESS).Fmint(index, wallet, supply, metadata)

  console.log('Minted to: ', wallet)
  return (result.hash)
}

module.exports.Fmint = Fmint
