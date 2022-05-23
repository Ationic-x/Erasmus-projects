'use strict'
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const { Schema } = mongoose

const SubscriptionSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4
  },
  orderDate: {
    type: String
  },
  maxAmount: {
    type: Number,
    validate: {
      validator: v => v >= 0,
      message: () => 'Max amount must be a non-negative number.'
    }
  },
  amount: {
    type: Number,
    default: 1
  },
  formId: {
    type: String
  },
  index: {
    type: Number
  }
  // other field must be thinked after have study payment service
}, require('../../libs/defaultModelOptions.js'))

const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema, 'Subscriptions')

module.exports = { SubscriptionModel, SubscriptionSchema }
