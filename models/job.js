const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: Schema.Types.ObjectId,
        ref: 'JobType',
        required: true
    }, // Reference to JobType
    category: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    requirements: [String],
    responsibilities: [String],
    isLive: {
        type: Boolean,
        default: false
    }, // Indicates if the job is live
    postedDate: {
        type: Date,
        default: Date.now
    },

    benefits: [String], // List of job benefits
    jobTags: [String], // Tags or keywords related to the job
    companyCulture: String // Description of the company culture
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);