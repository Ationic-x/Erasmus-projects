'use strict'
const { Controller } = require('express-toolkit')

const { ApikeyModel } = require('./apikey.model.js')

const ApikeyController = new Controller({
  name: 'apikey',
  id: 'uuid',
  model: ApikeyModel
})

ApikeyController.registerHook('pre:save', (req, res, next) => {
  console.log('Saving a resource instance')
  next()
})

module.exports = ApikeyController
