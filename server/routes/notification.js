// Assuming you have already required 'express' and set up the router
const express = require('express');
const router = express.Router();

const {
    createNotification,
    getAllNotification,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getNotificationsByUserId,
    createNotificationsForJob,
    searchByJobSeekerId // Import the new function
} = require("../controller/notification");

// Existing routes...
router.post("/notification", createNotification);
router.get("/getAllNotification", getAllNotification);
router.get("/notification/:id", getNotificationById);
router.get("/getNotificationsByUserId/:id", getNotificationsByUserId);
router.put("/notification/:id", updateNotification);
router.delete("/notification/:id", deleteNotification);
router.post("/createForJob", createNotificationsForJob);
router.get("/searchByJobSeekerId/:jobSeekerId", searchByJobSeekerId); // New route for searching notifications by job seeker ID

module.exports = router;
