  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;

  const feedbackSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
      },
    feedbackType: { 
      type: String, 
      enum: ['job', 'employer', 'system'], 
      required: true 
  },
    content: { 
      type: String,
      required: true
  },
    rating: { 
      type: Number
  } // Rating provided, if applicable
  }, { timestamps: true });

  module.exports = mongoose.model('Feedback', feedbackSchema);