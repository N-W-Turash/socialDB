var faker = require('Faker');

var express = require('express');
var router = express.Router();
var Post = require("../app/models/post")

/* GET home page. */
router.get('/', function(req, res, next) {
    for(var i=0; i<20; i++){

        var post = new Post();
        post.user_id = Math.abs(parseInt(faker.Address.latitude()));
        post.title = faker.Lorem.sentence();
        post.body = faker.Lorem.paragraph();

        post.save();

        console.log(faker.Image.nightlife());
    }

    res.json({message: 'Data seeded successfully.'});
});

module.exports = router;