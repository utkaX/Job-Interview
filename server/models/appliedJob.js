const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appliedJobSchema = new Schema({
  jobSeekerId: { 
    type: Schema.Types.ObjectId, 
    ref: 'JobSeeker', required: true },
  jobId: { type: Schema.Types.ObjectId,
     ref: 'Job', 
     required: true },
  status: { 
    type: String,
     enum: ['applied', 'shortlisted', 'rejected', 'selected'], 
     default: 'applied' 
    },
  appliedDate: { 
    type: Date, 
    default: Date.now 
},
  coverLetter: String, // Cover letter submitted with the application
  resume: String, // URL or reference to the resume
  source: String, // Source where the job seeker found the job posting
  notes: String, // Additional notes or comments from the employer
  reviewDate: Date, // Date when the application was reviewed
  applicationType: String, // Type of application (e.g., "direct", "via referral")
  followUpDate: Date // Date for follow-up actions or notifications
}, { timestamps: true });

module.exports = mongoose.model('AppliedJob', appliedJobSchema);