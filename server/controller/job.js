const Job = require("../models/job");
const Employer = require("../models/employer"); // Add Employer model for company name search
const mongoose = require("mongoose");

exports.createJobs = async (req, res) => {
  try {
    // Check if the request body is an array or a single job
    if (Array.isArray(req.body)) {
      // Handle multiple jobs
      const jobs = await Job.insertMany(req.body);
      res.status(201).json(jobs);
    } else {
      // Handle a single job
      const job = new Job(req.body);
      await job.save();
      res.status(201).json(job);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllJob = async (req, res) => {
  try {
    // Fetch all jobs and populate the employerId with the companyName
    const jobs = await Job.find().populate("employerId", "companyName");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getJobsByEmployerId = async (req, res) => {
  const employerId  = req.params.id; // Extract employerId from request parameters

    // Find jobs that match the provided employerId
    const jobs = await Job.find({ employerId:new mongoose.Types.ObjectId(employerId) });
    // If no jobs are found, send a 404 response
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this employer." });
    }

    // Return the list of jobs
    res.status(200).json(jobs);
  // } catch (err) {
  //   // Handle any errors that occur during the query
  //   res.status(500).json({ message: "An error occurred while retrieving jobs.", error: err.message });
  // }
};

exports.updateJobById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const updateData = req.body; // Data to update

    // Find and update the job by ID
    const job = await Job.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validation on update
    });

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json(job); // Return the updated job
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors
  }
};

exports.deleteJobByTitle = async (req, res) => {
  try {
    const { title } = req.params; // Extract title from request parameters

    // Find and delete the job by title
    const job = await Job.findOneAndDelete({ title });

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentLiveJobs = async (req, res) => {
  try {
    const liveJobs = await Job.find({ isLive: true })
      .sort({ postedDate: -1 })
      .limit(6);

    res.status(200).json(liveJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// New Search Function
exports.searchJobs = async (req, res) => {
  try {
    const { location, experience, keyword } = req.query;

    // Base search query for location and live jobs
    const searchQuery = {
      isLive: true,
      ...(location && { location }), // Only add location if provided
    };

    // Optional filter for experience
    if (experience) {
      searchQuery.minExperience = { $lte: parseInt(experience, 10) };
    }

    // Search for job title with the provided keyword
    const keywordFilter = keyword
      ? {
          title: { $regex: keyword, $options: "i" }, // Search only in title
        }
      : {};

    // Find jobs matching the search criteria
    const jobs = await Job.find({
      ...searchQuery,
      ...keywordFilter,
    }).populate({
      path: "employerId",
      select: "companyName",
    });

    // Filter jobs that have valid employer data
    const filteredJobs = jobs.filter((job) => job.employerId);

    console.log(filteredJobs);

    res.status(200).json(filteredJobs);
  } catch (error) {
    console.error("Error in search API:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

exports.getJobsByCompanyId = async (req, res) => {
    try {
      const { companyId } = req.params; 
  
      const jobs = await Job.find({ employerId: companyId }).sort({ createdAt: -1 });
  
      if (jobs.length === 0)
        return res.status(404).json({ error: "No jobs found for this company" });
  
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  };
  
