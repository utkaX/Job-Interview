const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyDescription: String,
    companyWebsite: String,
    location: String,
    industry: String,
    jobsPosted: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    contactEmail: String,
    contactPhone: String,
    logo: String,
    socialMediaLinks: {
      linkedin: String,
      twitter: String,
      facebook: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employer", employerSchema);
