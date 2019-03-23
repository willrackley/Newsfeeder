var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    firstname: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
    type: String,
    required: true,
    validate: [
      function(input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
    },
    userCreated: {
    type: Date,
    default: Date.now
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
