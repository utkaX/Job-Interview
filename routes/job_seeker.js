const express = require("express");

const router = express.Router();

const {
    addjobseeker,
    getAllJobSeekers,
    getJobSeekerById,
    updateJobSeeker,
    deleteJobSeeker} = require("../controller/job_seeker");

router.post("/addjobseeker",addjobseeker);
router.get("/jobseeker",getAllJobSeekers);
router.get("/getJobSeekerById",getJobSeekerById);
router.put("/updateJobSeeker",updateJobSeeker);
router.delete("/deleteJobSeeker",deleteJobSeeker);

module.exports = router
