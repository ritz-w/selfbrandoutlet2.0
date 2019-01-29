const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(bodyParser.json())
app.use(function(req, res, next){
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
        if (err) req.user = undefined;
            req.user = decode;
            console.log(decode)
            next()
        })} else {
            req.user = undefined;
            next()
        }
    })

//configure database
const db = require('./config/db');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(db.url)
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

require('./routes')(app);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`we are live on port ${port}`)
})
