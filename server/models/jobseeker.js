const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  userId: { 
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
  savedJobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
  appliedJobs: [{
    jobId: { 
        type: Schema.Types.ObjectId,
         ref: 'Job'
         },
    status: {
         type: String, enum: ['applied', 'shortlisted', 'rejected', 'selected'], 
         default: 'applied'
         },
    appliedDate: {
         type: Date, 
         default: Date.now 
        },
    coverLetter: String, // Cover letter submitted with the application

    source: String, // Source where the job seeker found the job posting
    notes: String, // Additional notes or comments from the employer
    reviewDate: Date // Date when the application was reviewed
  }],
  profilePicture: String, // URL to profile picture
  availability: String, // Current job availability status
  preferredJobLocations: [String], // Preferred job locations
  jobTypePreferences: [{ type: Schema.Types.ObjectId, ref: 'JobType' }] // Preferred job types
}, { timestamps: true });

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);