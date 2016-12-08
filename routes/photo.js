var express = require("express");
var router = express.Router();
var Photo    = require('../app/models/photo');

// on routes that end in /photo/:photo_id
// ----------------------------------------------------
router.route('/:photo_id')

// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        Photo.findById(req.params.photo_id, function(err, photo) {
            if (err)
                res.send(err);
            res.json(photo);
        });
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/photos/:photo_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        Photo.findById(req.params.photo_id, function(err, photo) {

            if (err)
                res.send(err);

            photo.title = req.body.title;
            photo.imageUrl = req.body.imageUrl;

            // save the photo
            photo.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Photo updated!' });
            });

        });
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/photo/:photo_id)
    .delete(function(req, res) {
        Photo.remove({
            _id: req.params.photo_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;