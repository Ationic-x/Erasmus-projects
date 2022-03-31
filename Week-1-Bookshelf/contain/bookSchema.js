import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({      
    _id: Number,
    title: String,
    author: String,
    cover: String,
    price: Number,
    desc: String,
})

const book = mongoose.model('Book', bookSchema)

export default book