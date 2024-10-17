const express=require('express')
const router=express.Router();

const{createNotification,
    getAllNotification,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getNotificationsByUserId
}=require("../controller/notification");


router.post("/notification",createNotification);
router.get("/getAllNotification",getAllNotification);
router.get("/notification/:id",getNotificationById);
router.get("/getNotificationsByUserId/:id",getNotificationsByUserId);
router.put("/notification/:id",updateNotification);
router.delete("/notification/:id",deleteNotification);


module.exports=router