const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventType: { 
    type: String,
     enum: ['job_fair', 'webinar', 'networking_event'],
      required: true
     },
  eventDate: { 
    type: Date, 
    required: true
 },
  description: String,
  location: String,
  link: String // Link to register or get more information about the event
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);