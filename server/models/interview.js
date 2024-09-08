const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  appliedJobId: { 
    type: Schema.Types.ObjectId, 
    ref: 'AppliedJob',
     required: true
     },
  interviewMode: {
     type: String, 
     enum: ['online', 'offline'], 
     required: true
     },
  interviewDateTime: {
     type: Date,
      required: true
     },
  interviewLink: String, // Link to the online interview platform, if applicable
  roomId: String, // Room ID for the interview, if using this platform
  address: String, // Address for offline interviews
  feedback: String, // Feedback from the interview, if available
  interviewers: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Names or IDs of interviewers
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);