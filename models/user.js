const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = mongoose.model('User', userSchema);