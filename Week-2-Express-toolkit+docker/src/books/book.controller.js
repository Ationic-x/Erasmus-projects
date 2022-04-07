'use strict'
const { Controller } = require('express-toolkit')

const { BookModel } = require('./book.model.js')

const BookController = new Controller({
  name: 'book',
  id: 'uuid',
  model: BookModel
})

module.exports = BookController
