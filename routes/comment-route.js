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
    db.Comment.create(req.body)
    .then(function(dbComment) {
      
      // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    commentId.push(dbComment._id);
    return db.User.findOneAndUpdate({ _id: req.user.id}, { $push: { comments: dbComment._id } }, { new: true });
    
    
    })
    .then(function(dbUser) {
      console.log(commentId[0])
      
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
      return db.Article.findOneAndUpdate({ _id: req.body.article_id}, { $push: { comments: commentId[0] } }, { new: true });
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
})


module.exports = router;