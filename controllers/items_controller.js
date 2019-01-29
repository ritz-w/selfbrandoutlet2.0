const Item = require('../models/items_model.js');
const Artist = require('../models/artists_model.js');
const Cart = require('../models/cart_model.js')

exports.findAll = (req, res) => {
    Item.find()
    .populate('artist')
    .then(items => {
        res.send(items); 
        }).catch(err => {
            res.status(500).send({
                message: err.message
        })
    })
}

exports.create = (req, res) => {
    const newItem = new Item({
        name: req.body.name, 
        desc: req.body.desc,
        price: req.body.price,
        artist: req.body.artist,
        sources: req.body.sources,
        medium: req.body.medium,
        year: req.body.year,
        vectorPhoto: req.body.vectorPhoto,
        contextPhoto: req.body.contextPhoto
    })

    newItem.save()
    .then(item => {
        res.send(item)
    }).catch(err => {
        console.log("There was an error saving the new item.")
        res.status(500).send({
            message: err.message
        })
    })
    Artist.findById(req.body.artist)
    .then(artist => {
        artist.items.push(newItem)
        artist.save().then(artist => {
        console.log("Artist association successfully saved")
        }).catch(err => {
            console.log("There was an error associating the new item to its artist.")
            res.status(500).send({
                message: err.message
            })
        })
    })
}

exports.findOne = (req, res) => {
    Item.findById(req.params.id)
    .then(item => {
        if (!item) {
            res.status(404).send({
                message: "Customer not found with id" + req.params.id
            })
        } else {
            console.log("Item successfully found.")
            res.send(item)
        }
    }).catch(err => res.status(404).send({message: err.message}))    
}

exports.findByArtistId = (req, res) => {
    Item.find({artist: req.params.artistId})
    .exec((err, artistsItems) => {
        if (err) {
            console.log("Provided artist id not found")
            res.status(404).send({message: "Products by artist with id " + req.params.artistId + "was not found."})
        }
        res.send(artistsItems) 
    })
}

exports.update = (req, res) => {
    Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        desc: req.body.desc,
        price: req.body.price,
        artist: req.body.artist,
        sources: req.body.sources,
        medium: req.body.medium,
        year: req.body.year,
        vectorPhoto: req.body.vectorPhoto,
        contextPhoto: req.body.contextPhoto

    }, {new: true})
    .then(item => {
        if (!item) {
            console.log("Item you are trying to update is not found.")
            res.status(404).send({message: "Item with id " + req.params.id + "not found."})
        } else {
            console.log("Item successfully updated.")
            res.send(item)
        }
    }).catch(err => res.status(404).send({message: err.message}))    
}

exports.delete = (req, res) => {
    Item.findById(req.params.id)
    .then(item => {
        Artist.findById(item.artist)
        .then(artist => {
            let itemIndex = artist.items.indexOf(item)
            artist.items.splice(itemIndex, 1)
            console.log(artist.items)
            artist.save().then(artist => {
                console.log("Association with artist removed successfully")
            })
        })
    })
    Item.findByIdAndDelete(req.params.id)
    .then(item => {
        if (!item) {
            console.log("Item you're trying to delete does not exist.")
            res.status(404).send({message: "Item with id " + req.params.id + "not found."})
        } else {
            console.log("Item deleted successfully.")
            res.send({message: "Item deleted successfully!"})
        }
    }).catch(err => {
        res.status(404).send({message: err.message})
    })
}


exports.addToCart = (req, res) => {
    let itemId = req.params.id;
    let oldCart = req.body.sessionCart
    let cart = new Cart(oldCart);
    Item.findById(itemId)
    .then(item => {
        if (!item) {
            console.log("Item you're trying to add does not exist.")
            res.redirect('/')
        } else {
            const itemExists = cart.findExisting(item, itemId)
            cart.add(itemExists)
           res.send({cart: cart})
        }
    })
}

exports.updateCart = (req, res) => {
    let itemId = req.params.id;
    let oldCart = req.body.sessionCart
    let addOrMinus = req.body.addOrMinus
    console.log(itemId)
    console.log(oldCart)
    console.log(addOrMinus)
    let cart = new Cart(oldCart);
    Item.findById(itemId)
    .then(item => {
        if (!item) {
            console.log("Item you're trying to update does not exist.")
            res.redirect('/')
        } else {
            console.log(item)
            const itemExists = cart.findExisting(item, itemId)
            cart.updateItem(itemExists, itemId, addOrMinus)
           res.send({cart: cart})
        }
    })
}

exports.removeFromCart = (req, res) => {
    let itemId = req.params.id;
    let oldCart = req.body.sessionCart
    let cart = new Cart(oldCart);
    Item.findById(itemId)
    .then(item => {
        if (!item) {
            console.log("Item you're trying to remove does not exist.")
            res.redirect('/')
        } else {
            const itemExists = cart.findExisting(item, itemId)
            cart.removeItem(itemExists, itemId)
           res.send({cart: cart})
        }
    })
}

exports.checkout = (req, res) => {
    var stripe = require('stripe')("sk_test_rNJRrmW8UUoBgY7SEJ1L0gFR")
    stripe.charges.create({
        amount: req.body.amount * 100,
        currency: req.body.currency,
        description: req.body.description,
        source: req.body.source,
        statement_descriptor: `Self Brand Outlet`,
        receipt_email: req.body.email
    }, (err, result) => {
        if (err) {
            res.send({error: err})
        } else {
            console.log(result)
            res.send({charge: result})
        }
    })
}