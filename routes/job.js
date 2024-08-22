const express = require('express');
const router = express.Router();


const{
    createJob,
    getAllJob,
    updateJobByTitle,
    deleteJobByTitle,
    getJobByTitle}=require("../controller/job")


router.post("/",createJob)
router.get("/",getAllJob)
router.get("/:title",getJobByTitle)
router.put("/:title",updateJobByTitle)
router.delete("/:title",deleteJobByTitle)


module.exports=router