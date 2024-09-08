const express = require('express');
const router = express.Router();


const{
    createFeedback,
    getAllFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback}=require("../controller/feedback")


router.post("/createFeedback",createFeedback)
router.get("/getAllFeedback",getAllFeedback)
router.get("/getFeedback/:id",getFeedback)
router.put("/updateFeedback/:id",updateFeedback)
router.delete("/deleteFeedback/:id",deleteFeedback)


module.exports=router