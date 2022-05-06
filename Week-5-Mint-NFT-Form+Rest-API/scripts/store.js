const { NFTStorage, File } = require("nft.storage")
const fs = require('fs')
require('dotenv').config()

const { NFT_STORAGE_API_KEY } = process.env
var format;

//Store script, check if is image o metada and change metadata
//The rest classic store function of file (not image+metadata) NFT.Storage and return the CID  
async function Store(n, n2){
    if (n.substring(0, n.indexOf("/")) == 'img'){
        format = 'image/png'
    }
    else{
        format = 'application/json'
    }
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
    const cid = await client.storeDirectory([
        file = new File([await fs.promises.readFile(`./temporary/${n}`)], n2, { type: format }),
    ])
    console.log(cid);
    return cid;
}

module.exports.Store = Store