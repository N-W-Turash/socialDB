var express = require("express");
var router = express.Router();

var fs = require("fs");
var multer = require('multer');

var Photo     = require('../app/models/photo');

var fileName = null;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        fileName = Date.now() + '.jpg'
        cb(null, fileName ); //Appending .jpg
    }
})

var upload = multer({ storage: storage });

router.route('/')

// create a user (accessed at POST http://localhost:8080/api/posts)
    .get(function (req, res) {
        res.sendfile("index.html");
    })

    .post(upload.single("file"), function (req, res) {

        //console.log(req.file);
        var file = __dirname + "/" + req.file.originalname;
        var title = req.body.title;
        fs.readFile( req.file.path, function (err, data) {
            fs.writeFile(file, data, function (err) {

                var response;

                if( err ){
                    console.error( err );
                    response = {
                        message: 'Sorry, file couldn\'t be uploaded.',
                        url: file,
                        filename: req.file.originalname,
                        title: title
                    };
                }else{
                    /*response = {
                        message: 'File uploaded successfully',
                        url: file,
                        filename: req.file.originalname,
                        title: title
                    };*/

                    var photo = new Photo();
                    photo.title = title;
                    photo.imageUrl = 'http://localhost:3000/uploads/' + fileName;

                    photo.save(function(err) {
                        if (err)
                            res.send(err);
                        res.json(photo);
                    });
                }
                //res.end( JSON.stringify( response ) );
            });
        });
    })

module.exports = router;