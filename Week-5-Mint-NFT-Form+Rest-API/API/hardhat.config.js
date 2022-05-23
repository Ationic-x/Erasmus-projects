/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('@nomiclabs/hardhat-ethers')
require('dotenv').config()
module.exports = {
  defaultNetwork: 'PolygonMumbai',
  networks: {
    hardhat: {
    },
    PolygonMumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: '0.8.12',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
