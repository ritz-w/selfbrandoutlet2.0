const mongoose = require('mongoose'), Schema = mongoose.Schema
const Artist = require('./artists_model.js');
 
const ItemSchema = mongoose.Schema({
    name: String,
    desc: String,
    price: Number,
    sources: String,
    medium: String,
    year: String,
    vectorPhoto: String,
    contextPhoto: String,
    artist: {type: Schema.Types.ObjectId, ref: 'Artist' }
});
 
module.exports = mongoose.model('Item', ItemSchema);