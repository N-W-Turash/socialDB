// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var port = process.env.PORT || 3000;        // set our port
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socialDB'); // connect to our database

app.use(cors(corsOptions))

// ROUTES FOR OUR API
// =============================================================================
var userSeeder = require('./seeders/userSeeder');
var usersRoute = require('./routes/users');
var userRoute = require('./routes/user');
app.use('/api/users', usersRoute);
app.use('/api/users', userRoute);
app.use('/userseeder', userSeeder);

var postSeeder = require('./seeders/postSeeder');
var postsRoute = require('./routes/posts');
var postRoute = require('./routes/post');
app.use('/api/posts', postsRoute);
app.use('/api/posts', postRoute);
app.use('/postseeder', postSeeder);

var photoSeeder = require('./seeders/photoSeeder');
var photosRoute = require('./routes/photos');
var photoRoute = require('./routes/photo');
app.use('/api/photos', photosRoute);
app.use('/api/photos', photoRoute);
app.use('/photoseeder', photoSeeder);

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
