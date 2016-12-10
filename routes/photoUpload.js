var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var express = require("express");
var router = express.Router();
//var Photo     = require('../app/models/photo');

router.get('/', function(req, res, next){
    res.send("response with a resource");
    next();
})

router.post('/', upload.any(), function(req, res){
    res.send(req.files);
})

module.exports = router;


/*var express = require("express");
var router = express.Router();
var Photo     = require('../app/models/photo');
;
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ dest: 'uploads/' }).single('avatar')

// var storage = multer.diskStorage({
//     destination: function (request, file, callback) {
//         callback(null, '/example/uploads');
//     },
//     filename: function (request, file, callback) {
//         console.log(file);
//         callback(null, file.originalname)
//     }
// });

// on routes that end in /api/photos/
// ----------------------------------------------------
router.route('/')

// create a photo (accessed at POST http://localhost:8080/api/photos)
    .post(function(req, res) {



        upload(req, res, function (err) {
            if (err) {
               console.log("error----",err)
                res.send(err);
            }
            console.log("-------",req.body);
            res.send(req.file);


            // Everything went fine
        })
        return;


        var photo = new Photo();
        photo.title = req.body.title;
        photo.imageUrl = req.body.imageUrl;

        photo.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Photo created!' });
        });

    })*/

//module.exports = router;