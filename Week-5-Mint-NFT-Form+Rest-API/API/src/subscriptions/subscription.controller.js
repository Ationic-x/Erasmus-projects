'use strict'
const { Controller } = require('express-toolkit')

const { SubscriptionModel } = require('./subscription.model.js')

const SubscriptionController = new Controller({
  name: 'subscription',
  id: 'uuid',
  model: SubscriptionModel
})

SubscriptionController.registerHook('pre:save', (req, res, next) => {
  console.log('Saving a resource instance')
  next()
})

module.exports = SubscriptionController
