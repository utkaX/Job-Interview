const JobSeeker = require("../models/jobseeker");
const mongoose = require("mongoose");
const Job = require("../models/job");
const Employer = require("../models/employer");

// Create a new job seeker
exports.createJobSeeker = async (req, res) => {
  try {
    const newJobSeeker = new JobSeeker(req.body);
    const savedJobSeeker = await newJobSeeker.save();
    res.status(201).json(savedJobSeeker);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating job seeker", error: err.message });
  }
};

// Get all job seekers
exports.getAllJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find(); // Fetch all job seekers from the database
    res.status(200).json(jobSeekers);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching job seekers", error: err.message });
  }
};

// Get a job seeker by user ID
exports.getJobSeekerByUserId = async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const jobSeeker = await JobSeeker.findOne({ user: userId })
      .populate("user")
      .exec();

    if (!jobSeeker) {
      return res.status(200).json({
        success: false,
        message: 'No profile found for this user'
      });
    }

    res.status(200).json(jobSeeker);
  } catch (err) {
    console.error("Error fetching job seeker:", err);
    res.status(500).json({
      message: "Server error while fetching job seeker",
      error: err.message,
    });
  }
};

// Update a job seeker by ID
exports.updateJobSeekerById = async (req, res) => {
  try {
    const userId = req.params.id; // Get userId from the request parameters

    // Find the job seeker by userId and update their details
    const updatedJobSeeker = await JobSeeker.findOneAndUpdate(
      { user: userId }, // Filter by user ID
      req.body,
      { new: true, runValidators: true } // Options: new returns the updated document, runValidators validates the update
    );

    if (!updatedJobSeeker) {
      return res.status(404).json({ message: "Job seeker not found" });
    }
    
    res.status(200).json(updatedJobSeeker);
  } catch (err) {
    res.status(500).json({ message: "Error updating job seeker", error: err.message });
  }
};

// Delete a job seeker
exports.deleteJobSeeker = async (req, res) => {
  try {
    const deletedJobSeeker = await JobSeeker.findByIdAndDelete(req.params.id);
    if (!deletedJobSeeker)
      return res.status(404).json({ message: "Job Seeker not found" });
    res.status(200).json({ message: "Job Seeker deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting job seeker", error: err.message });
  }
};

// Save a job
exports.saveJob = async (req, res) => {
  const { jobSeekerId, jobId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(jobSeekerId) ||
    !mongoose.Types.ObjectId.isValid(jobId)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid job seeker or job ID format" });
  }

  try {
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker)
      return res.status(404).json({ message: "Job seeker not found" });

    // Check if job is already saved
    if (!jobSeeker.savedJobs.includes(jobId)) {
      jobSeeker.savedJobs.push(jobId);
      await jobSeeker.save();
    }

    res.status(200).json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving job", error: err.message });
  }
};

// Remove a saved job
exports.removeSavedJob = async (req, res) => {
  const { jobSeekerId, jobId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(jobSeekerId) ||
    !mongoose.Types.ObjectId.isValid(jobId)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid job seeker or job ID format" });
  }

  try {
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker)
      return res.status(404).json({ message: "Job seeker not found" });

    // Remove the job from the saved jobs list
    jobSeeker.savedJobs = jobSeeker.savedJobs.filter(
      (savedJobId) => savedJobId.toString() !== jobId
    );
    await jobSeeker.save();

    res
      .status(200)
      .json({ message: "Job removed from saved jobs successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing saved job", error: err.message });
  }
};

exports.getSavedJobs = async (req, res) => {
    const jobSeekerId = req.params.id;
  
    // Validate the job seeker ID format
    if (!mongoose.Types.ObjectId.isValid(jobSeekerId)) {
      return res.status(400).json({ message: "Invalid job seeker ID format" });
    }
  
    try {
      const jobSeeker = await JobSeeker.findById(jobSeekerId);
  
      // Check if the job seeker exists
      if (!jobSeeker) {
        return res.status(404).json({ message: "Job seeker not found" });
      }
  
      // Map over saved jobs to get details from the Job model
      const savedJobsWithDetails = await Promise.all(
        jobSeeker.savedJobs.map(async (jobId) => {
          const job = await Job.findById(jobId).populate({
            path: "employerId",
            model: "Employer",
            select: "companyName",
          });
  
          // Check if the job exists
          if (!job) {
            return null; // Return null if the job is not found
          }
  
          // Return the full job object along with employer details
          return {
            _id: job._id,
            title: job.title,
            description: job.description,
            location: job.location,
            salary: job.salary,
            employerId: job.employerId, // Include the complete employer object
          };
        })
      );
  
      // Filter out any null results
      const filteredJobs = savedJobsWithDetails.filter((job) => job !== null);
  
      res.status(200).json(filteredJobs);
    } catch (err) {
      res.status(500).json({ message: "Error fetching saved jobs", error: err.message });
    }
  };
  
// Check if a job is saved for a job seeker
exports.isJobSaved = async (req, res) => {
  const { jobSeekerId, jobId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(jobSeekerId) ||
    !mongoose.Types.ObjectId.isValid(jobId)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid job seeker or job ID format" });
  }

  try {
    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker not found" });
    }

    // Check if job is saved
    const isSaved = jobSeeker.savedJobs.includes(jobId);

    res.status(200).json({ isSaved });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error checking saved job", error: err.message });
  }
};
