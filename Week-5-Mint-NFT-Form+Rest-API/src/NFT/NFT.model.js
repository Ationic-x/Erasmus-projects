'use strict'
const mongoose = require('mongoose')
const { stringify } = require('uuid')
const { v4: uuidv4 } = require('uuid')

const { Schema } = mongoose

const rstring = {type: String, required: true }
const rnumber = {type: Number, required: true}

const NFTSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4
  },
  formID: {
    type: String,
    unique: true,
    required: true
  },
  email: rstring,
  amount: rnumber,
  index: Number
})

const NFTModel = mongoose.model('NFT', NFTSchema, 'NFTs')

module.exports = { NFTModel, NFTSchema }