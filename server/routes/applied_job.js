const express = require('express');
const router = express.Router();


const{
    createAppliedJob,
    getAllAppliedJobs,
    getAppliedJobById,
    updateAppliedJob,
    deleteAppliedJob}=require("../controller/applied_job")


router.post("/createApplyJob",createAppliedJob)
router.get("/getAllAppliedJob",getAllAppliedJobs)
router.get("/getAppliedJobById/:id",getAppliedJobById)
router.put("/updateAppliedJobById/:id",updateAppliedJob)
router.delete("/deleteAppliedJob/:id",deleteAppliedJob)


module.exports=router