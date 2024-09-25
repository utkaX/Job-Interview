const express = require('express');
const router = express.Router();


const{
    createJobs,
    getAllJob,
    updateJobById,
    deleteJobByTitle,
    getRecentLiveJobs,
    getJobById}=require("../controller/job")


router.post("/addJob",createJobs)
router.get("/getAllJob",getAllJob)
router.get("/getJobById/:id",getJobById)
router.put("/updateJobById/:id",updateJobById)
router.delete("/deleteJob/:title",deleteJobByTitle)
router.get('/live', getRecentLiveJobs);


module.exports=router