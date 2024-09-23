const express=require('express')
const router=express.Router()


const{
getAllJobType,
createJobType,
getJobTypeByTitle,
updateJobType,
deleteJobType}=require("../controller/job_type")


router.get("/getJobType",getAllJobType)
router.post("/createJobType",createJobType)
router.get("/getJobTypeByTitle/:title",getJobTypeByTitle)
router.put("/updateJobType/:id",updateJobType)
router.delete("/deleteJobType/:id",deleteJobType)

module.exports=router
