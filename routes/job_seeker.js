const express = require("express");

const router = express.Router();

const {addjobseeker} = require("../controller/job_seeker");

router.post("/addjobseeker",addjobseeker);

module.exports = router
