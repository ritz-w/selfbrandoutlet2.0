const Artist = require('../models/artists_model')

exports.findAll = (req, res) => {
    Artist.find()
    .populate('items')
    .exec((err, artists) => {
        if(err) {
            console.log("There was an error.")
            res.status(500).send("There was an error with this request.")
        }
        res.send(artists)
    })
}

exports.findOne = (req, res) => {
    Artist.findById(req.params.id)
    .populate('items')
    .exec((err, artist) => {
        if(err) {
            console.log("There was an error.")
            res.status(500).send("There was an error with this request.")
        }
        res.send(artist)
    })
}

exports.create = (req, res) => {
    const newArtist = new Artist({
        name: req.body.name,
        bio: req.body.bio,
        context: req.body.context,
        photo: req.body.photo
    })

    newArtist.save()
    .then(artist => {
        console.log("New artist successfully saved!")
        res.send(artist)
    }).catch(err => {
        console.log(err.message)
        res.status(500).send({message: "There was an error saving the new artist."})
    })
}

exports.update = (req, res) => {
    Artist.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        bio: req.body.bio,
        context: req.body.context,
        photo: req.body.photo

    }, {new: true})
    .then(artist => {
        if (!artist) {
            console.log("Artist you are trying to update is not found.")
            res.status(404).send({message: "Artist with id " + req.params.id + "not found."})
        } else {
            console.log("Artist successfully updated.")
            res.send(artist)
        }
    }).catch(err => res.status(404).send({message: err.message}))    
}

exports.delete = (req, res) => {
    Artist.findByIdAndDelete(req.params.id)
    .then(artist => {
        if (!artist) {
            console.log("Artist you're trying to delete does not exist.")
            res.status(404).send({message: "Item with id " + req.params.id + "not found."})
        } else {
            console.log("Artist deleted successfully.")
            res.send({message: "Artist deleted successfully!"})
        }
    }).catch(err => {
        res.status(404).send({message: err.message})
    })
}
