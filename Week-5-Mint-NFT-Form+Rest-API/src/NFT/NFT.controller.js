'use strict'
const { Controller } = require('express-toolkit')
const fs = require('fs')
const path = require('path')

const { NFTModel } = require('./NFT.model.js')

//Imported external scripts (not relationed with Express-toolkit)
const Storage = require('../../scripts/store.js')
const CreateCollection = require('../../scripts/collection.js')
const Mint = require('../../scripts/mint.js')
const Mailto = require('../../scripts/mail.js')

//Array of options ID and her amount value
const ID = [['15cac03d-b471-4dd7-a7d3-9672f2b1be84', 
'74e24940-ebbe-47e1-9222-5d37a65bfc96', 
'4ed2e475-7d70-4852-83cd-5832037bbb16',
'9c515b70-d881-44d6-8141-164e5195df53',
'14399505-633d-4386-9591-acc0c5f62830',
'f4a82b6a-742a-44e2-b226-e55963139c85'],
[10, 100, 888, 1000, 5000, 10000]]

//Create controller Express-toolkit
const NFTController = new Controller({
  name: 'NFT',
  id: 'uuid',
  model: NFTModel
})

//Function endpoint show web
async function Web(req,res){
  return res.sendFile(path.join(__dirname, '../../web/index.html'))
}

//Function endpoint get data of the form
//After send a mail
async function Mail(req,res){
  const formID = await req.body.eventId
  const service = await req.body.data.fields[0].value
  const email = await req.body.data.fields[1].value
  const amount = await ID[1][ID[0].indexOf(service)]
  await NFTModel.create({
    formID: formID,
    email: email,
    amount: amount,
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  console.log('Stored in database')
  const applicant = await NFTModel.find({'formID': formID})
  await Mailto.Send(email, applicant[0].uuid)
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  console.log('Mailed')
  console.log(`Done ${applicant}`)
  return await res.sendStatus(200)
}

//Function endpoint send file
//First create file getting data of the publish image
//Call script store in nft.storage
//Return ipfs data
async function PFile(req,res){
  if (await ApiAuth(req, res)) return
  const bname = await req.files['file'][0].originalname
  const Pname = await req.headers.apio_key + '/' + bname
  const buffer = await req.files['file'][0].buffer.toString('base64')
  await fs.mkdir(`./temporary/img/${req.headers.apio_key}`, {recursive: true}, function (err) {if (err) throw (err)})
  await fs.writeFile(`./temporary/img/${Pname}`, buffer, 'base64', function (err) {if (err) throw err})
  console.log('Created file')
  const CID = await Storage.Store(`img/${Pname}`, bname)
  .catch((error) => {
      console.error(error)
      process.exit(1)
  })
  res.send(`| CID: ${CID} |
  | IPFS URL: ipfs://${CID}/${bname} |
  | URL: https://ipfs.io/ipfs/${CID}/${bname} |
  | Name: ${bname} |
  | Image: <img src="data:image/pngbase64,${buffer}" /> |`)
  return await fs.rm(`./temporary/img/${req.headers.apio_key}`, {recursive: true}, function (err) {if (err) throw err}, console.log("Done"))
}

//Function endpoint send metada
//First create file getting data of the publish metada
//Call script store in nft.storage
//Return ipfs data
async function PMetada(req,res){
  if (await ApiAuth(req, res)) return
  const b = await req.body
  if (!b.name || !b.image || !b.description) return res.send('Requiered parameters not sent')
  if (b.attributes && (!b.attributes.trait_type || !b.attributes.value)) return res.send ('Requiered parameters not sent')
  const bname = await b.name + '.json'
  const Pname = await req.headers.apio_key + '/' + bname
  await fs.mkdir(`./temporary/metadata/${req.headers.apio_key}`, {recursive: true}, function (err) {if (err) throw (err)})
  await fs.writeFile(`./temporary/metadata/${Pname}`, JSON.stringify(b, null, 4), function (err) {if (err) throw err})
  console.log('Created file')
  const CID = await Storage.Store(`metadata/${Pname}`, bname)
  .catch((error) => {
      console.error(error)
      process.exit(1)
  })
  res.send(`| CID: ${CID} |
  | IPFS URL: ipfs://${CID}/${bname} |
  | URL: https://ipfs.io/ipfs/${CID}/${bname} |`)
  return await fs.rm(`./temporary/metadata/${req.headers.apio_key}`, {recursive: true}, function (err) {if (err) throw err}, console.log("Done"))
}

//Function endpoint make a collection
//Check parameters required and call script binded with solidity factory
async function PCollection(req,res){
  if (await ApiAuth(req, res)) return
  if ((await NFTModel.find({'uuid': req.headers.apio_key}))[0].index !== undefined) return res.send('Already have an collection')
  const b = await req.body
  if (!b.name || !b.symbol) return res.send('Requiered parameters not sent')
  const Created = await CreateCollection.Collection(b.name, b.symbol)
  .catch((error) => {
      console.error(error)
      process.exit(1)
  })
  await NFTModel.updateOne({uuid: req.headers.apio_key}, { index: ((await NFTModel.find()).length - 1)})
  return await res.send(Created)
}

//Function endpoint mint NFT
//Check parameters required and call script binded with solidity factory
async function PMint(req,res){
  if (await ApiAuth(req, res)) return
  const b = await req.body
  if (!b.wallet || !b.metadata) return res.send('Requiered parameters not sent')
  const Data = await NFTModel.find({'uuid': req.headers.apio_key})
  const Minted = await Mint.Fmint(Data.index, b.wallet, Data.amount, b.metadata)
  .catch((error) => {
      console.error(error)
      process.exit(1)
  })
  return await res.send(Minted)
}

//Basic key auth
//Requiered header APIO_KEY and a real API-key == uuid
async function ApiAuth(req, res){
  if (!req.headers.apio_key) {
    return res.send('Missing authorization header')
  }
  const auth = await NFTModel.find({'uuid': req.headers.apio_key})
  if(!auth[0]) return res.send('Not authorized')
}

module.exports = {NFTController, Web, PFile, PMetada, PCollection, PMint, Mail}