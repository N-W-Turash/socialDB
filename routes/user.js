var express = require("express");
var router = express.Router();
var User     = require('../app/models/user');

// on routes that end in /users/:users_id
// ----------------------------------------------------
router.route('/:user_id')

// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/user/:user_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the bears info
            user.username = req.body.username;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.company_name = req.body.company_name;

            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;