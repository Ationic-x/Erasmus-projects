'use strict'
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const { Schema } = mongoose

const rstring = {type: String, required: true }
const rnumber = {type: Number, required: true}

const BookSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4
  },
  title: rstring,
  author: rstring,
  cover: rstring,
  price: rnumber,
  desc: rstring,
})

const BookModel = mongoose.model('Book', BookSchema, 'Books')

module.exports = { BookModel, BookSchema }
