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
    loggedIn: {
      type: Boolean,
      default: false
    },
    userCreated: {
    type: Date,
    default: Date.now
    },
    // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the User with any associated Notes
    comments: [
      {
        // Store ObjectIds in the array
        type: Schema.Types.ObjectId,
        // The ObjectIds will refer to the ids in the Note model
        ref: "Comment"
      }
    ]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
