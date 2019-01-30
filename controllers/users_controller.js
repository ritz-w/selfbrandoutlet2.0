const User = require('../models/users_model.js');
const bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    console.log('hi')
    const newUser = new User(req.body);
    console.log(req.body.password)
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            if (err.code === 11000) {
                return res.status(400).send({
                    type: "Email exists",
                    message: "😖❗Another user exists with the same email. Try again with another email address."
                })}
            else if (err.name === "ValidationError") {
                return res.status(400).send({
                    type: "Email format",
                    message: "😖❗There is a problem with the formatting of your email address, or one of the fields are missing. Try again."
                })
            }
            else {
                return res.status(400).send({
                    message: err
                })
            }
            
        } else {
            console.log(user)
            user.hash_password = undefined;
            return res.json(user)
        }
    })
}


exports.sign_in = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            })
        }
        if (!user) {
            res.status(401).json({message: 'Authentication failed, User not found.'})
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status().json({message: 'Authentication failed, wrong password.'})
            } else {
                return res.json({token: jwt.sign({email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs', {expiresIn: '1d'})});
            }
        }
    })
}

exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        return res.status(401).json({message: "Unauthorised user!"})
    }
}