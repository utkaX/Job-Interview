const express = require('express');
const router = express.Router();

const {
    createInterview,
    getAllInterviews,
    getInterviewById,
    updateInterviewById,
    deleteInterviewById,
    getInterviewsByAppliedJobId
} = require("../controller/interview"); 

router.post("/create", createInterview); 
router.get("/", getAllInterviews); 
router.get("/:id", getInterviewById);
router.put("/:id", updateInterviewById); 
router.delete("/:id", deleteInterviewById);
router.get("/appliedJob/:appliedJobId", getInterviewsByAppliedJobId); 

module.exports = router;
