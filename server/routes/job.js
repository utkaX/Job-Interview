const express = require('express');
const router = express.Router();


const{
    createJobs,
    getAllJob,
    updateJobByTitle,
    deleteJobByTitle,
    getJobById}=require("../controller/job")


router.post("/addJob",createJobs)
router.get("/getAllJob",getAllJob)
router.get("/getJobById/:id",getJobById)
router.put("/updateJobById/:title",updateJobByTitle)
router.delete("/deleteJob/:title",deleteJobByTitle)


module.exports=router