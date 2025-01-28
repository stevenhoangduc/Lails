const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  company: {
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true
  }, 
  notes: String,
  postingLink: String,
  status: {
    type: String,
    // enums are the options that you have as the value of status
    enum: ['interested', 'interviewing', 'rejected', 'accepted', 'applied']
  }
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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
