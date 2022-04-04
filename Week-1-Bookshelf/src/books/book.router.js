import * as BookController from './book.controller.js'
import express from 'express'
var router = express();

router.use(express.json())
router.use(express.urlencoded({ extended: false}))

router.get('/', BookController.homeb)
router.get('/v1/books', BookController.getb)
router.get('/v1/books/:id', BookController.filterb)

router.post('/v1/books', BookController.addb)

router.put('/v1/books/:id', BookController.updateb)

router.delete('/v1/books', BookController.deleteallb)
router.delete('/v1/books/:id', BookController.deleteb)

router.listen(5000)

export var router