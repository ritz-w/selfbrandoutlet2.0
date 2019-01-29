const mongoose = require('mongoose'), Schema = mongoose.Schema
// const Item = require('./items_model')

const ArtistSchema = mongoose.Schema({
    name: {type: String, required: true},
    bio: String,
    context: String,
    photo: String,
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
})

module.exports = mongoose.model('Artist', ArtistSchema)