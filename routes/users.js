var express = require("express");
var router = express.Router();
var User     = require('../app/models/user');

// on routes that end in /api/users/
// ----------------------------------------------------
router.route('/')

// create a user (accessed at POST http://localhost:8080/bears)
    .post(function(req, res) {

        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.company_name = req.body.company_name;

        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });

    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.paginate({}, { page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 20}, function(err, user) {
            if (err){
                console.error(err);
                res.send(err);
            }else{
                res.json(user);
            }
        });
    });

module.exports = router;