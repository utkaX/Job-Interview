const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { 
    type: String,
     required: true, 
     unique: true
     },
  password: { 
    type: String,
     required: true 
    },
  role: {
     type: String, 
     enum: ['job_seeker', 'employer'], 
     required: true 
    },
  profilePicture: String, // URL to profile picture
  lastLogin: Date // Last login time
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);