import * as BookController from './book.controller.js'
import express from 'express'
var app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/', BookController.homeb)
app.get('/v1/books', BookController.getb)
app.get('/v1/books/:id', BookController.filterb)

app.post('/v1/books', BookController.addb)

app.put('/v1/books/:id', BookController.updateb)

app.delete('/v1/books', BookController.deleteallb)
app.delete('/v1/books/:id', BookController.deleteb)

export var app