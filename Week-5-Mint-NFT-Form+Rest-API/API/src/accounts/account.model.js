'use strict'
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const { Schema } = mongoose

const AccountSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4
  },
  email: {
    type: String,
    required: true
  }
}, require('../../libs/defaultModelOptions.js'))

const AccountModel = mongoose.model('Account', AccountSchema, 'Accounts')

module.exports = { AccountModel, AccountSchema }
