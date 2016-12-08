var faker = require('Faker');

var express = require('express');
var router = express.Router();
var Photo = require("../app/models/photo")

/* GET home page. */
router.get('/', function(req, res, next) {
    for(var i=0; i<20; i++){

        var photo = new Photo();
        photo.title = faker.Lorem.sentence();
        photo.imageUrl= "http://placehold.it/600/1ee8a4";

        photo.save();
    }

    res.json({message: 'Data seeded successfully.'});
});

module.exports = router;