const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/v1/books', require('./src/books/book.router'))

mongoose.connect('mongodb://mongo:27017/booksdb',function(err){
    if(err){
        console.error('Can not connect:', err)
    }
    else{
        app.listen(5000, () => {
            console.log('Connected')
        })
    }
})