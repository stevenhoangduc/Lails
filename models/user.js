// <!-- updated all application to lail 1/28 -->

const mongoose = require('mongoose');

const lailsSchema = mongoose.Schema({
  image: {
    type: String, 
    required: true
  },
  addmusic: {
    type: String,
    required: true
  }, 
  comments: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Comment"
  }],
  likes: Number,
 
})

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 1 to many relationship using embedding
  // 1 user has many applications, application belongs to a user
  lails: [lailsSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
