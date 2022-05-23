'use strict'
const { buildRouter } = require('express-toolkit')

const SubscriptionController = require('./subscription.controller.js')

const SubscriptionRouter = buildRouter({
  controller: SubscriptionController
})

module.exports = SubscriptionRouter
