const mongoose = require('mongoose');

// Define the user schema for both login and registration
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  contactNumber: {
    type: Number,
    required: true
  }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;
