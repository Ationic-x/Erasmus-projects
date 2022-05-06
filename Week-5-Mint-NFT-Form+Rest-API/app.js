const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/nfts', require('./src/NFT/NFT.router'))

mongoose.connect('mongodb://localhost:27017/ApioNFT',function(err){
    if(err){
        console.error('Can not connect:', err)
    }
    else{
        app.listen(5000, () => {
            console.log('Connected')
        })
    }
})