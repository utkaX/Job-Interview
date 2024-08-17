const express = require('express');
const router = express.Router();


const{
    createApplyJob,
    getAllAppliedJob,
    getAppliedJob,
    updateAppliedJob,
    deleteAppliedJob}=require("../controller/applied_job")


router.post("/createApplyJob",createApplyJob)
router.get("/getAllAppliedJob",getAllAppliedJob)
router.get("/getAppliedJob/:id",getAppliedJob)
router.put("/updateAppliedJob/:id",updateAppliedJob)
router.delete("/deleteAppliedJob/:id",deleteAppliedJob)


module.exports=router