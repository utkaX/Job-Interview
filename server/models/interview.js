const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new Schema(
  {
    appliedJobId: {
      type: Schema.Types.ObjectId,
      ref: "AppliedJob",
      required: true,
    },
    interviewMode: {
      type: String,
      enum: ["online", "offline"],
      required: true,
    },
    interviewDateTime: {
      type: Date,
      required: true,
    },
    interviewLink: String,
    roomId: String,
    address: String,
    feedback: String,
    interviewers: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
