const express = require("express");

const router = express.Router();

const {
  createJobSeeker,
  getAllJobSeekers,
  getJobSeekerByUserId,
  updateJobSeekerById,
  deleteJobSeeker,
  saveJob,
  getSavedJobs,
  isJobSaved,
  removeSavedJob, // Import the new function
} = require("../controller/job_seeker");

// Existing routes
router.post("/addjobseeker", createJobSeeker);
router.get("/getAlljobseeker", getAllJobSeekers);
router.get("/getJobSeekerById/:id", getJobSeekerByUserId);
router.get("/getJobSeekerByUserId/:id", getJobSeekerByUserId);
router.put("/updateJobSeekerById/:id", updateJobSeekerById);
router.delete("/deleteJobSeeker/:id", deleteJobSeeker);


// New routes for saved jobs
router.post("/save-job", saveJob); // Save a job
router.get("/saved-jobs/:id", getSavedJobs); // Get saved jobs for a job seeker
router.get("/saved-job/:jobSeekerId/:jobId", isJobSaved);
router.delete("/remove-saved-job", removeSavedJob); // Remove a saved job

module.exports = router;
