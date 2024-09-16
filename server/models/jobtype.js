const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobTypeSchema = new Schema({
  title: { 
    type: String,
     required: true, 
     unique: true
     },
  description: String 
}, { timestamps: true });

module.exports = mongoose.model('JobType', jobTypeSchema);