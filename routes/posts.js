var express = require("express");
var router = express.Router();
var Post     = require('../app/models/post');

// on routes that end in /api/posts/
// ----------------------------------------------------
router.route('/')

// create a user (accessed at POST http://localhost:8080/api/posts)
    .post(function(req, res) {

        var post = new Post();
        post.user_id = req.body.user_id;
        post.title = req.body.title;
        post.body = req.body.body;

        post.save(function(err) {
            if (err)
                res.status(400).send(err);
            res.json(post);
        });

    })

    // get all the users (accessed at GET http://localhost:8080/api/posts)
    .get(function(req, res) {

        Post.paginate({}, {  sort: { createdAt: -1 }, page: parseInt(req.query.page) || 1, limit: parseInt(req.query.limit) || 20}, function(err, post) {
            if (err){
                console.error(err);
                res.send(err);
            }else{
                res.json(post);
            }
        });
    });

module.exports = router;