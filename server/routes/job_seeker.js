const express = require("express");

const router = express.Router();

const {
    createJobSeeker,
    getAllJobSeekers,
    getJobSeekerById,
    updateJobSeekerById,
    deleteJobSeeker} = require("../controller/job_seeker");

router.post("/addjobseeker",createJobSeeker);
router.get("/getAlljobseeker",getAllJobSeekers);
router.get("/getJobSeekerById/:id",getJobSeekerById);
router.put("/updateJobSeekerById/:id",updateJobSeekerById);
router.delete("/deleteJobSeeker/:id",deleteJobSeeker);

module.exports = router
