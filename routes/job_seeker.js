const express = require("express");

const router = express.Router();

const {addjobseeker,getAllJobSeekers} = require("../controller/job_seeker");

router.post("/addjobseeker",addjobseeker);
router.get("/jobseeker",getAllJobSeekers);

module.exports = router
