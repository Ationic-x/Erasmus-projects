//Load methods
import * as router from './src/books/book.router.js'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/booksdb',function(err){
    if(err){
        console.error('Can not connect:', err)
    }
    else{
        router.app.listen(5000, () => {
            console.log('Connected')
        })
    }
})