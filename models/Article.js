var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
  },
  comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
});


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
