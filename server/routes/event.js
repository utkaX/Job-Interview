const express = require('express');
const router = express.Router();


const{
    createEvent,
    getAllEvent,
    getEventById,
    updateEventById,
    deleteEventById}=require("../controller/event")


router.post("/createEvent",createEvent)
router.get("/getAllEvent",getAllEvent)
router.get("/getEvent/:id",getEventById)
router.put("/updateEvent/:id",updateEventById)
router.delete("/deleteEvent/:id",deleteEventById)


module.exports=router