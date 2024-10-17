const express = require("express");
const router = express.Router();

const {
  createAppliedJob,
  getAllAppliedJobs,
  getAppliedJobById,
  updateAppliedJob,
  deleteAppliedJob,
  getApplicationsByJobSeekerId,
  companyApplications,
  getApplicationsByJobId,
  getCandidatesByJobIdAndEmployerId,
  updateStatus,
} = require("../controller/applied_job");

router.post("/createApplyJob", createAppliedJob);
router.get("/getApplications/:id", companyApplications);
router.get("/getAllAppliedJob", getAllAppliedJobs);
router.get("/getAppliedJobById/:id", getAppliedJobById);
router.get("/apliedjobforjs/:jobSeekerId", getApplicationsByJobSeekerId);
router.put("/updateAppliedJobById/:id", updateAppliedJob);
router.delete("/deleteAppliedJob/:id", deleteAppliedJob);
router.get(
  "/applications/:employerId/job/:jobId",
  getCandidatesByJobIdAndEmployerId
);
router.get("/getAppliedJob/:jobId",getApplicationsByJobId );
router.put("/update/:id",updateStatus);

module.exports = router;
