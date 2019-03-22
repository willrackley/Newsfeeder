var express = require('express');
var db = require("../models");
var router = express.Router();

router.get("/", function(req, res) {
    db.Comment.find({}, function(error, data) {
        // Log any errors if the server encounters one
        if (error) {
          console.log(error);
        }
        // Otherwise, send the result of this query to the browser
        else {
          res.json(data);
        }
      });
});

router.post('/submit', function(req, res) {
  var commentId = [];
  req.body.user = req.user.firstname;
  req.body.userId = req.user.id

    db.Comment.create(req.body)
    .then(function(dbComment) {
    commentId.push(dbComment._id);
    return db.Article.findOneAndUpdate({ _id: req.body.article_id }, { $push: { comments: dbComment._id } }, { new: true });
    
    })
    .then(function(dbUser) {
      res.json(dbUser);
      // return db.Article.findOneAndUpdate({ _id: req.body.article_id}, { $push: { comments: commentId[0] } }, { new: true });
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
})

router.get('/my-comments', function(req, res) {
  
  db.Comment.find({ userId: req.user.id}, function(err, dbComment) {
    if (err)
        res.send(err);
    else
        res.json(dbComment);
  });
});

//route to delete comments
router.delete('/delete/:id', function(req, res) {
  db.Comment.findByIdAndRemove({ _id: req.params.id}, function(err) {
    if (err)
        res.send(err);
    else
        res.json("delete");
  });
});


module.exports = router;