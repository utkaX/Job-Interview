const JobType = require("../models/jobtype");
const { response } = require("express");

exports.getAllJobType = async (req, res) => {
  try {
    const jobTypes = await JobType.find();
    res.status(200).json(jobTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createJobType = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Check if the JobType already exists
    const existingJobType = await JobType.findOne({ title });
    if (existingJobType) {
      return res
        .status(400)
        .json({ error: `JobType '${title}' already exists` });
    }

    // Create a new JobType
    const jobType = new JobType({ title, description });
    await jobType.save();

    res.status(201).json(jobType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getJobTypeById = async (req, res) => {
  try {
    const { id } = req.params; // Get the job type ID from the request params
    const jobType = await JobType.findById(id); // Find job type by ID
    if (!jobType) {
      return res.status(404).json({ message: "Job type not found" });
    }
    return res.status(200).json(jobType);
  } catch (error) {
    console.error("Error fetching job type by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



exports.getJobTypeByTitle = async (req, res) => {
  try {
    const { title } = req.params; // Get the title from the request params

    // Find the job type with the matching title (case-insensitive)
    const jobType = await JobType.findOne({
        title: { $regex: new RegExp("^" + title + "$", "i") }
      });
    console.log(jobType);
    if (!jobType) {
      return res.status(404).json({ message: "Job type not found" });
    }

    return res.status(200).json(jobType);
  } catch (error) {
    console.error("Error fetching job type by title:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateJobType = async (req, res) => {
  try {
    const jobType = await JobType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!jobType) return res.status(404).json({ error: "JobType not found" });
    res.status(200).json(jobType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJobType = async (req, res) => {
  try {
    const jobType = await JobType.findByIdAndDelete(req.params.id);
    if (!jobType) return res.status(404).json({ error: "JobType not found" });
    res.status(200).json({ message: "JobType deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
