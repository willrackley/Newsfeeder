var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
  // `body` is of type String
    body: {
      type: String
  },
    user: {
      type: String
    },
    userId: {
      type: String
    }
  });

var Comment = mongoose.model("Comment", CommentSchema);


module.exports = Comment;
