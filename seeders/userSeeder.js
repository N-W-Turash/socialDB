var faker = require('Faker');

var express = require('express');
var router = express.Router();
var User = require("../app/models/user")

/* GET home page. */
router.get('/', function(req, res, next) {
    for(var i=0; i<20; i++){

        var user = new User();
        user.name = faker.Name.findName();
        user.username = faker.Name.firstName();
        user.email = faker.Internet.email();
        user.phone = faker.PhoneNumber.phoneNumber();
        user.company_name = faker.Company.companyName();

        user.save();
    }

    res.json({message: 'Data seeded successfully.'});
});

module.exports = router;