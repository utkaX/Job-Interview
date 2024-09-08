const express=require('express')
const router=express.Router()


const{
getAllJobType,
createJobType,
getJobTypeById,
updateJobType,
deleteJobType}=require("../controller/job_type")


router.post("/createJobType",createJobType)
router.get("/getJobType",getAllJobType)
router.get("/jobTypeById/:id",getJobTypeById)
router.put("/updateJobType/:id",updateJobType)
router.delete("/deleteJobType/:id",deleteJobType)

module.exports=router
