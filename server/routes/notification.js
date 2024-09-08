const express=require('express')
const router=express.Router();

const{createNotification,
    getAllNotification,
    getNotificationById,
    updateNotification,
    deleteNotification
}=require("../controller/notification");


router.get("/notification",createNotification);
router.get("/getAllNotification",getAllNotification);
router.get("/notification/:id",getNotificationById);
router.put("/notification/:id",updateNotification);
router.delete("/notification/:id",deleteNotification);


module.exports=router