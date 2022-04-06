import book from './book.model.js'

//Initial site
export async function homeb (req, res) {
    return res.send('<h1>Home Page</h1><h2>Bookshelf</h2><a href="/v1/books">Our books</a>')
}

//Obtain book information
export async function getb (req, res) {
    if (Object.entries(req.query).length){
        if (req.query.title === undefined){
            return res.send()
        }
        return res.send(await book.find({ title: { $in: [ new RegExp(req.query.title, 'i') ] }}))   
    }
    return res.send(await book.find())
}

//Filter by params
export async function filterb (req, res) {
    return res.send(await book.findById(Object.values(req.params)))
}

//Add book
export async function addb (req, res) {
    const Nbook = req.body
    await book.create({
        _id: Nbook.id,
        title: Nbook.title,
        author: Nbook.author,
        cover: Nbook.cover,
        price: Nbook.price,
        desc: Nbook.desc,
    }, function(err){
        if(err){
            return res.send()
    }
    else{
        return res.send('sucess')
        }
    })
}

//Update book by id
export async function updateb (req, res) {
    const Ubook = req.body
    book.findByIdAndUpdate(Object.values(req.params),
        {
        _id: Ubook.id,
        title: Ubook.title,
        author: Ubook.author,
        cover: Ubook.cover,
        price: Ubook.price,
        desc: Ubook.desc,
    }, function(err){
        if(err){
            return res.send()
        }
        else{
            return res.send('sucess')
        }
    })
}

//Delete by id
export async function deleteb (req, res){
    if (await book.findById(Object.values(req.params))) {
        book.deleteOne({_id: Object.values(req.params)}, function(err){
            if(err){
                return res.send()
            }
            else{
                return res.send('sucess')
            }
        })
    }
    return res.send()
}

//Delete all
export async function deleteallb (req, res) {
    book.deleteMany({}, function(err){
        if(err){
            return res.send()
        }
        else{
            return res.send('sucess')
        }
    })
}
