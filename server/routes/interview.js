const express = require('express');
const router = express.Router();


const{
    createInterview,
    getAllInterview,
    getInterviewById,
    updateInterviewById,
    deleteInterviewById}=require("../controller/interview")


router.post("/createInterview",createInterview)
router.get("/getAllInterview",getAllInterview)
router.get("/getInterviewById/:id",getInterviewById)
router.put("/updateInterviewById/:id",updateInterviewById)
router.delete("/deleteInterviewById/:id",deleteInterviewById)


module.exports=router