var express = require("express");
var router = express.Router();
var Post     = require('../app/models/post');

// on routes that end in /posts/:post_id
// ----------------------------------------------------
router.route('/:post_id')

// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        Post.findById(req.params.post_id, function(err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/user/:user_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        Post.findById(req.params.post_id, function(err, post) {

            if (err)
                res.send(err);

           // post.user_id = req.body.user_id;
            post.title = req.body.editTitle;
            post.body = req.body.editBody;

            // save the bear
            post.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Post updated!' });
            });

        });
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/posts/:post_id)
    .delete(function(req, res) {
        Post.remove({
            _id: req.params.post_id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;