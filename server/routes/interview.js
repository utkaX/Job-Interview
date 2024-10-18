const express = require('express');
const router = express.Router();

const {
    createInterview,
    getAllInterviews,
    getInterviewById,
    updateInterviewById,
    deleteInterviewById,
    getInterviewsByAppliedJobId,getShortlistedJobsByEmployerId
} = require("../controller/interview"); 

router.post("/create", createInterview); 
router.get("/", getAllInterviews); 
router.get("/:id", getInterviewById);
router.put("/:id", updateInterviewById); 
router.delete("/:id", deleteInterviewById);
router.get("/appliedJob/:appliedJobId", getInterviewsByAppliedJobId); 
router.get("/shortlistedJobs/:employerId", getShortlistedJobsByEmployerId);

module.exports = router;
