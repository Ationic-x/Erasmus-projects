import express from 'express'
import mongoose from 'mongoose'
import book from './bookSchema.js'
const app = express()

mongoose.connect('mongodb://localhost/booksdb')

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//Initial site
app.get('/', async (req, res) => {
    res.send('<h1>Home Page</h1><h2>Bookshelf</h2><a href="/v1/books">Our books</a>')
})

//Obtain book information
app.get('/v1/books',async (req, res) => {
    const filters = req.query
    const books = await book.find()
    if (Object.keys(filters)[0] === undefined) {
    return res.send(books)
    } else {
        var index = [
            ['id'],
            ['title'],
            ['author'],
            ['cover'],
            ['price'],
            ['desc'],
        ]
        var web = []
        //Filter by query
        if (filters.id) {
            for (var i = 0; books[i] !== undefined; i++) {
                const idRe = new RegExp(Number(filters.id), 'i')
                var search = idRe.exec(books[i]._id)
                if (search != null) {
                    index[0].push(i)
                }
            }
        } else {
            for (var i = 0; books[i] !== undefined; i++) {
                    index[0].push(i)
                }
        }
        if (filters.title) {
            for (var i = 0; books[i] !== undefined; i++) {
                const titleRe = new RegExp(filters.title, 'i')
                var search = titleRe.exec(books[i].title)
                if (search != null) {
                    index[1].push(i)
                }
            }
        } else {
            for (var i = 0; books[i] !== undefined; i++) {
                index[1].push(i)
            }
        }
        if (filters.author) {
            for (var i = 0; books[i] !== undefined; i++) {
                const authRe = new RegExp(filters.author, 'i')
                var search = authRe.exec(books[i].author)
                if (search != null) {
                    index[2].push(i)
                }
            }
        } else {
            for (var i = 0; books[i] !== undefined; i++) {
                index[2].push(i)
            }
        }
        if (filters.cover) {
            for (var i = 0; books[i] !== undefined; i++) {
                const covRe = new RegExp(filters.cover, 'i')
                var search = covRe.exec(books[i].cover)
                if (search != null) {
                    index[3].push(i)
                }
            }
        } else {
            for (var i = 0; books[i] !== undefined; i++) {
                index[3].push(i)
            }
        }
        if (filters.price) {
            for (var i = 0; books[i] !== undefined; i++) {
                const pricRe = new RegExp(Number(filters.price), 'i')
                var search = pricRe.exec(books[i].price)
                if (search != null) {
                    index[4].push(i)
                }
            }
        } else {
            for (var i = 0; books[i] !== undefined; i++) {
                index[4].push(i)
            }
        }
        if (filters.desc) {
            for (var i = 0; books[i] !== undefined; i++) {
                const descRe = new RegExp(filters.desc, 'i')
                var search = descRe.exec(books[i].desc)
                if (search != null) {
                    index[5].push(i)
                }
            }
        } else {
            for (var i = 0; books[i] !== undefined; i++) {
                index[5].push(i)
            }
        }
        //Check real property
        //Resolve multiple filtered data
        var j = 0;
        for (var i = 0; Object.keys(filters)[i] !== undefined; i++) {
            if (Object.keys(filters)[i] === ('id') ||
            Object.keys(filters)[i] === ('title') ||
            Object.keys(filters)[i] === ('author') ||
            Object.keys(filters)[i] === ('cover') ||
            Object.keys(filters)[i] === ('price') ||
            Object.keys(filters)[i] === ('desc')) {
                for (var j; books[j] !== undefined; j++) {
                    if (index.filter(book => book.includes(j)).length === 6) {
                        web.push(books[j])
                    }
                }
            } else {
                return res.status(404).json({ success: false, msg: `Use the corrects parameters` })
            }
        }
        //Responses
        if (web[0] === undefined) {
            return res.status(404).json({ success: false, msg: `Use the corrects parameters` })
        }
        return res.send(web)
    }
})

//Filter by params
app.get('/v1/books/:id',async (req, res) => {
    const { id } = req.params
    const books = await book.find()
    const singleProduct = books.find((product) => product._id === Number(id))
    //Responses
    if (!singleProduct) {
        return res.status(404).json({ success: false, msg: `The book with id ${id} does not exist` })
    }
    return res.send(singleProduct)
})

//Add book
app.post('/v1/books',async (req, res) => {
    //Request and check
    const info = req.body
    const books = await book.find()
    if (!info.id || !info.title || !info.author || !info.cover || !info.price || !info.desc) {
        return res.status(400).json({ success: false, msg: 'Please provide all the information' })
    }
    const singleProduct = books.find((product) => product._id === Number(info.id))
    if (!(info.price > 0)) {
        return res.status(400).json({ success: false, msg: 'Please use a correct value for the price' })
    } else if (singleProduct || !(info.id > 0)) {
        return res.status(400).json({ success: false, msg: 'Please use a valid id' })
    }
    //Add
    await book.create({
        _id: Number(info.id),
        title: info.title,
        author: info.author,
        cover: info.cover,
        price: Number(info.price),
        desc: info.desc,
    })
    const update = await book.find()
    const New_book = update[books.length]
    return res.status(201).json({ success: true, msg: 'Added book', New_book})
})

//Update book by id
app.put('/v1/books/:id', async (req, res) => {
    //Call all data
    const books = await book.find()
    const { id } = req.params
    const info = req.body
    const index = books.findIndex(book => book._id === Number(id))
    const Outdaded_Book = books[index]
    var title = info.title
    var author = info.author
    var cover = info.cover
    var price = Number(info.price)
    var desc = info.desc
    //Check
    if (index < 0) {
        return res.status(400).json({ success: false, msg: `No book with id ${id}` })
    }
    if (!(info.price > 0)) {
        return res.status(400).json({ success: false, msg: 'Please use a correct value for the price' })
    }
    //Update
    if (!info.title) { title = books[index].title }
    if (!info.author) { author = books[index].author }
    if (!info.cover) { cover = books[index].cover }
    if (!info.price) { price = Number(books[index].price) }
    if (!info.desc) { desc = books[index].desc }
    if (info.id === id || !info.id) {
        await book.updateOne({ _id: id},
            {
            _id: Number(id),
            title: title,
            author: author,
            cover: cover,
            price: price,
            desc: desc,
        })
        const update = await book.find()
        const Updated_Book = update[index]
        return res.status(200).json({ success: true, msg: 'Change done', Outdaded_Book, Updated_Book })
    } return res.status(404).json({ success: false, msg: `Don't matches id ${id} and id ${info.id}` })
})

//Delete by id
app.delete('/v1/books/:id', async (req, res) => {
    const { id } = req.params
    const books = await book.find()
    //Cheack and searh book index
    const index = books.findIndex(book => book._id === Number(id))
    if (index < 0) {
        return res.status(404).json({ success: false, msg: `No book with id ${id}` })
    }
    const Deleted_Book = books[index]
    //Delete
    await book.deleteOne({_id: id})
    return res.status(200).json({ success: true, msg: 'Deleted', Deleted_Book})
})

//Delete all
app.delete('/v1/books/', async (req, res) => {
    await book.remove({})
    return res.status(200).json({ success: true, msg: 'All books was delete' })
})

//Port 5000
app.listen(5000)
