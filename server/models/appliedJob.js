const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appliedJobSchema = new Schema({
  jobSeekerId: { 
    type: Schema.Types.ObjectId, 
    ref: 'JobSeeker', 
    required: true 
  },
  jobId: { 
    type: Schema.Types.ObjectId,
    ref: 'Job', 
    required: true 
  },
  status: { 
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'selected'], 
    default: 'applied' 
  },
  appliedDate: { 
    type: Date, 
    default: Date.now 
  },
  coverLetter: { 
    type: String, 
    required: true // Make it required if you want to enforce it
  }, // Cover letter submitted with the application
  resume: { 
    type: String, 
    required: true // Make it required if you want to enforce it
  }, // URL or reference to the resume
  source: { 
    type: String, 
    enum: ['job board', 'company website', 'referral', 'social media', 'other'], // Example sources
    default: 'other' 
  }, // Source where the job seeker found the job posting
  notes: { 
    type: String, 
    default: null // Optional field
  }, // Additional notes or comments from the employer
  reviewDate: { 
    type: Date, 
    default: null // Optional field
  }, // Date when the application was reviewed
  applicationType: { 
    type: String, 
    enum: ['direct', 'via referral'], // Example application types
    default: 'direct' 
  }, // Type of application (e.g., "direct", "via referral")
  followUpDate: { 
    type: Date, 
    default: null // Optional field
  } // Date for follow-up actions or notifications
}, { timestamps: true });

module.exports = mongoose.model('AppliedJob', appliedJobSchema);
