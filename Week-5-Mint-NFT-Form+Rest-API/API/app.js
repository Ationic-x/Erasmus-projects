const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/docs', express.static('./web'))
app.use('/nfts', require('./src/NFT/NFT.router'))

app.get('/', (req, res) => {
  res.send({
    name: 'NFT service',
    description: 'This is a service for manage NFTs',
    version: '1.0.0'
  })
})

mongoose.connect('mongodb://localhost:27017/ApioNFT', function (err) {
  if (err) {
    console.error('Can not connect:', err)
  } else {
    app.listen(port, function (err) {
      if (err) console.log('Error in server setup:', err)
      else console.log('Server listening on', port)
    })
  }
})
