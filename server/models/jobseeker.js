const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User= require("./user")

const experienceSchema = new Schema({
  companyName: { 
     type: String, 
    required: true
 },
  jobTitle: { 
    type: String,
     required: true 
    },
  startDate: { 
    type: Date, 
    required: true
 },
  endDate: { 
    type: Date
 },
  description: String
}, { _id: false });





const educationSchema = new Schema({
  schoolName: { 
    type: String, 
    required: true 
},
  degree: { 
    type: String, 
    required: true
 },
  fieldOfStudy: {
     type: String, 
     required: true 
    },
  startDate: {
     type: Date,
      required: true 
    },
  endDate: { 
    type: Date 
}
}, { _id: false });




const jobSeekerSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId,
     ref: 'User', 
     required: true
     },
  firstName: { 
    type: String,
     required: true
     },
  lastName: { 
    type: String,
     required: true
     },
  bio: String,
  resume: String,
  skills: [String],
  experience: [experienceSchema],
  education: [educationSchema],
  location: String,
  profilePicture: String,
  preferredJobLocations: [String], // Preferred job locations
  jobTypePreferences: Object
}, { timestamps: true });

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);