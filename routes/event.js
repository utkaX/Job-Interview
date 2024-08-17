const express = require('express');
const router = express.Router();


const{
    createEvent,
    getAllEvent,
    getEvent,
    updateEvent,
    deleteEvent}=require("../controller/event")


router.post("/createEvent",createEvent)
router.get("/getAllEvent",getAllEvent)
router.get("/getEvent/:id",getEvent)
router.put("/updateEvent/:id",updateEvent)
router.delete("/deleteEvent/:id",deleteEvent)


module.exports=router