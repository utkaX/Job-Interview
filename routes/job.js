const express = require('express');
const router = express.Router();


const{
    createJob,
    getAllJob,
    getJobById,
    updateJob,
    deleteJob}=require("../controller/job")


router.post("/createJob",createJob)
router.get("/getAllJob",getAllJob)
router.get("/getJob/:id",getJobById)
router.put("/updateJob/:id",updateJob)
router.delete("/deleteJob/:id",deleteJob)


module.exports=router