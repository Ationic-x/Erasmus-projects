'use strict'
const { buildRouter } = require('express-toolkit')

const BookController = require('./book.controller.js')

const BookRouter = buildRouter({
  controller: BookController,
    endpoints: {
      updateByQuery: false,
      count: false,
      patchById: false,
      replaceById: false
    }
})

module.exports = BookRouter