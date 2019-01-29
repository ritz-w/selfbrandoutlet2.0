const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let validator = require('validator');
const Item = require('./items_model.js');

 
const UserSchema = mongoose.Schema({
    fullName: String,
    email: 
    {type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
        return validator.isEmail(value)
        }
    },
    hash_password: {
        type: String, 
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password)
};
 
module.exports = mongoose.model('User', UserSchema);