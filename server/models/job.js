const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    employerId: {
      type: Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: Schema.Types.ObjectId,
      ref: "JobType",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    requirements: [String],
    responsibilities: [String],
    isLive: {
      type: Boolean,
      default: true,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    Experience: {
      type: Number,
      required: true,
    },

    benefits: [String], // List of job benefits
    jobTags: [String], // Tags or keywords related to the job
    companyCulture: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
