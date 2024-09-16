const express = require('express');
const router = express.Router();


const{
    createJobs,
    getAllJob,
    updateJobByTitle,
    deleteJobByTitle,
    getJobByTitle}=require("../controller/job")


router.post("/addJob",createJobs)
router.get("/getAllJob",getAllJob)
router.get("/getJobByTitle/:title",getJobByTitle)
router.put("/updateJobById/:title",updateJobByTitle)
router.delete("/deleteJob/:title",deleteJobByTitle)


module.exports=router