const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'User must have a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'User must have a last name'],
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'User must have a username.'],
    trim: true,
    unique: true,
    lowerCase: true,
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password!'],
  },
});

module.exports = mongoose.model('User', userSchema);
