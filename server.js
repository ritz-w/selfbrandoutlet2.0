const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const path = require("path")
const port = process.env.PORT || 5000;

require("dotenv").config()

//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(function(req, res, next){
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, (err, decode) => {
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
const mongoDb = require('./config/db');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.url)
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

//use routes
require('./routes')(app);

//serve static assets if in production

if (process.env.NODE_ENV === 'production') {
    console.log('we are in production')
    //set a static folder
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

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

app.listen(port, () => {
    console.log(`we are live on port ${port}`)
})
