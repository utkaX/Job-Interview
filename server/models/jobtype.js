const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobTypeSchema = new Schema({
  title: { 
    type: String,
     required: true, 
     unique: true
     }, // Title of the job type
  description: String // Description of the job type
}, { timestamps: true });

module.exports = mongoose.model('JobType', jobTypeSchema);