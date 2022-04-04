import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/booksdb')

const rstring = {type: String, required: true }
const rnumber = {type: Number, required: true}

const bookSchema = new mongoose.Schema({      
    _id: rnumber,
    title: rstring,
    author: rstring,
    cover: rstring,
    price: rnumber,
    desc: rstring,
})

const book = mongoose.model('Book', bookSchema)

export default book