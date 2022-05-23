'use strict'
const { Controller } = require('express-toolkit')
const fs = require('fs/promises')
const crypto = require('crypto')

// Importes external models
const { AccountModel } = require('../accounts/account.model.js')
const { ApikeyModel } = require('../apikeys/apikey.model.js')
const { SubscriptionModel } = require('../subscriptions/subscription.model.js')

// Imported external scripts (not relationed with Express-toolkit)
const Storage = require('../../scripts/store.js')
const CreateCollection = require('../../scripts/collection.js')
const Mint = require('../../scripts/mint.js')
const Mailto = require('../../scripts/mail.js')

// Array of options ID and her amount value
const ID = [['15cac03d-b471-4dd7-a7d3-9672f2b1be84',
  '74e24940-ebbe-47e1-9222-5d37a65bfc96',
  '4ed2e475-7d70-4852-83cd-5832037bbb16',
  '9c515b70-d881-44d6-8141-164e5195df53',
  '14399505-633d-4386-9591-acc0c5f62830',
  'f4a82b6a-742a-44e2-b226-e55963139c85'],
[10, 100, 888, 1000, 5000, 10000]]

// Create controller Express-toolkit
const NFTController = new Controller({
  name: 'Account',
  id: 'uuid',
  model: AccountModel
})

// Function endpoint get data of the form
// After send a mail
async function Mail (req, res) {
  try {
    const b = req.body
    const amount = ID[1][ID[0].indexOf(b.service)]
    await AccountModel.create({
      email: b.email
    })
    console.log('Created account')
    const sub = await SubscriptionModel.create({
      orderDate: b.date,
      maxAmount: amount,
      formId: b.formID
    })
    console.log('Created subscription')
    const key = await ApikeyModel.create({
      Name: b.name,
      subscriptionId: sub.uuid
    })
    console.log('Create APIkey')
    await Mailto.Send(b.email, key.value)
    console.log('Mailed')
    const hashedKey = crypto.createHash('sha256').update(key.value).digest('base64')
    await key.updateOne({ value: hashedKey })
    console.log('Encrypted key')
    console.log('Done')
  } catch (error) {
    console.log('An error happened while sending email: ', error)
  }
  res.sendStatus(200)
}

// Function endpoint send file
// First create file getting data of the publish image
// Call script store in nft.storage
// Return ipfs data
async function PFile (req, res) {
  try {
    const bname = req.files.file[0].originalname
    const Pname = req.headers.authorization + '/' + bname
    const buffer = req.files.file[0].buffer
    await fs.mkdir(`./temporary/img/${req.headers.authorization}`, { recursive: true })
    await fs.writeFile(`./temporary/img/${Pname}`, buffer)
    console.log('Created file')
    const CID = await Storage.Store(`img/${Pname}`, bname)
    res.json({
      CID: `${CID}`,
      IPFS_URL: `ipfs://${CID}/${bname}`,
      URL: `https://ipfs.io/ipfs/${CID}/${bname}`,
      Name: `${bname}`
    })
    await fs.rm(`./temporary/img/${req.headers.authorization}`, { recursive: true })
    console.log('Done')
  } catch (error) {
    console.log('An error happened while creating PNG: ', error)
    res.status(500).send('An error happened, please try again later')
  }
}

// Function endpoint send metada
// First create file getting data of the publish metada
// Call script store in nft.storage
// Return ipfs data
async function PMetada (req, res) {
  try {
    const b = req.body
    if (!b.name || !b.image || !b.description) return res.status(400).send('Requiered parameters not sent: name, image or description')
    if (b.attributes && (!b.attributes.trait_type || !b.attributes.value)) return res.status(400).send('Requiered parameters not sent: trait_type or value')
    const bname = b.name + '.json'
    const Pname = req.headers.authorization + '/' + bname
    await fs.mkdir(`./temporary/metadata/${req.headers.authorization}`, { recursive: true })
    await fs.writeFile(`./temporary/metadata/${Pname}`, JSON.stringify(b, null, 4))
    console.log('Created file')
    const CID = await Storage.Store(`metadata/${Pname}`, bname)
    res.json({
      CID: `${CID}`,
      IPFS_URL: `ipfs://${CID}/${bname}`,
      URL: `https://ipfs.io/ipfs/${CID}/${bname}`
    })
    await fs.rm(`./temporary/metadata/${req.headers.authorization}`, { recursive: true })
  } catch (error) {
    console.log('An error happened while creating metadata file: ', error)
    res.status(500).send('An error happened, please try again later')
  }
}

// Function endpoint make a collection
// Check parameters required and call script binded with solidity factory
async function PCollection (req, res) {
  try {
    const _Key = req.headers.authorization.slice(req.headers.authorization.indexOf(' ') + 1)
    const hashedKey = crypto.createHash('sha256').update(_Key).digest('base64')
    const Key = ApikeyModel.findOne({ value: hashedKey })
    if (Key.index !== undefined) return res.status(409).send('Already have an collection')
    const b = req.body
    if (!b.name || !b.symbol) return res.statu(400).send('Requiered parameters not sent')
    const Created = await CreateCollection.Collection(b.name, b.symbol)
    const indexNumber = await SubscriptionModel.countDocuments({ index: { $exists: true } })
    await SubscriptionModel.updateOne({ value: req.headers.authorization }, { index: indexNumber })
    res.json({
      Transaction_hash: `${Created}`,
      Transaction_URL: `https://mumbai.polygonscan.com/tx/${Created}`
    })
  } catch (error) {
    console.log('An error happened while creating a collection: ', error)
    res.status(500).send('An error happened, please try again later')
  }
}

// Function endpoint mint NFT
// Check parameters required and call script binded with solidity factory
async function PMint (req, res) {
  try {
    const b = req.body
    if (!b.wallet || !b.metadata) return res.status(400).send('Requiered parameters not sent')
    const _Key = req.headers.authorization.slice(req.headers.authorization.indexOf(' ') + 1)
    const hashedKey = crypto.createHash('sha256').update(_Key).digest('base64')
    const Key = await ApikeyModel.findOne({ value: hashedKey })
    const Data = await SubscriptionModel.findOne({ uuid: Key.subscriptionId })
    console.log('here')
    res.status(200).send(`Hola ${Data.amount}`)
    const Minted = await Mint.Fmint(Data.index, b.wallet, Data.maxAmount, b.metadata)
    await SubscriptionModel.updateOne({ uuid: Key.subscriptionId }, { amount: Data.amount + 1 })
    if (Data.amount >= Data.maxAmount) {
      await ApikeyModel.updateOne({ uuid: Key.uuid }, { status: 'revoked' })
    }
    res.json({
      Transaction_hash: `${Minted}`,
      Transaction_URL: `https://mumbai.polygonscan.com/tx/${Minted}`
    })
  } catch (error) {
    console.log('An error happened while minting NFT: ', error)
    res.status(500).send('An error happened, please try again later')
  }
}

module.exports = { NFTController, PFile, PMetada, PCollection, PMint, Mail }
