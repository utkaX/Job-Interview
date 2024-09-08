const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { 
    type: String, 
    required: true
 },
  description: String,
  location: String,
  industry: String,
  size: String // Size of the company (e.g., "Small", "Medium", "Large")
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);