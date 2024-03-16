const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique :  true
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
  },
  referredUserCode: {
    type: String
  },
  referralId: {
    type: String,  
    ref: 'ReferralTracking'  
  },
}, { collection: 'users' });


const User = mongoose.model('User', userSchema);

module.exports = User;
