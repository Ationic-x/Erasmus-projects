const { NFTStorage, File } = require('nft.storage')
const fs = require('fs/promises')
require('dotenv').config()

// Store script, check if is image o metada and change metadata
// The rest classic store function of file (not image+metadata) NFT.Storage and return the CID
async function Store (n, n2) {
  let format
  if (n.substring(0, n.indexOf('/')) === 'img') {
    format = 'image/png'
  } else {
    format = 'application/json'
  }
  const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY })
  const cid = await client.storeDirectory([
    new File([await fs.readFile(`./temporary/${n}`)], n2, { type: format })
  ])
  console.log(cid)
  return cid
}

module.exports.Store = Store
