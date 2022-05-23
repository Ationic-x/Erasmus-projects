'use strict'
const { buildRouter } = require('express-toolkit')

const ApikeyController = require('./apikey.controller.js')

const ApikeyRouter = buildRouter({
  controller: ApikeyController
})

module.exports = ApikeyRouter
