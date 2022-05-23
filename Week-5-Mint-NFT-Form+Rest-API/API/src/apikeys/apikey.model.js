'use strict'
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const { Schema } = mongoose

const ApikeySchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4
  },
  value: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4
  },
  name: {
    type: String
  },
  // apikey can handle only one subscription
  subscriptionId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'revoked'], // Switch to revoked only when amount in subscription reach maxAmount
    default: 'active'
  },
  type: { // the super-admin key is used only by the system (eg: when pipedream must call api after purchasing)
    type: String,
    enum: ['super-admin', 'regular'],
    default: 'regular'
  }
}, require('../../libs/defaultModelOptions.js'))

const ApikeyModel = mongoose.model('Apikey', ApikeySchema, 'Apikeys')

module.exports = { ApikeyModel, ApikeySchema }
