var express = require("express");
var router = express.Router();
var Photo     = require('../app/models/photo');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, '/example/uploads');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

// on routes that end in /api/photos/
// ----------------------------------------------------
router.route('/')

// create a photo (accessed at POST http://localhost:8080/api/photos)
    .post(function(req, res) {

        var photo = new Photo();
        photo.title = req.body.title;
        photo.imageUrl = req.body.imageUrl;

        photo.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Photo created!' });
        });

    })

    // get all the photos (accessed at GET http://localhost:8080/api/photos)
    .get(function(req, res) {

        Photo.paginate({}, { page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 20}, function(err, photo) {
            if (err){
                console.error(err);
                res.send(err);
            }else{
                res.json(photo);
            }
        });
    })

module.exports = router;