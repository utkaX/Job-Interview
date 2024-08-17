const express = require('express');
const router = express.Router();


const{
    createInterview,
    getAllInterview,
    getInterview,
    updateInterview,
    deleteInterview}=require("../controller/interview")


router.post("/createInterview",createInterview)
router.get("/getAllInterview",getAllInterview)
router.get("/getInterview/:id",getInterview)
router.put("/updateInterview/:id",updateInterview)
router.delete("/deleteInterview/:id",deleteInterview)


module.exports=router