const express = require('express');
const app = express();
const mongoose = require('mongoose');

let user = require("../models/user.js");
let notification = require("../models/notification.js");

let dbdata = require("./data.js");
// let notificationData = require("./notificationData.js");

main().then(() => {
    console.log("Connected to db.")
})
    .catch(err => {
        console.log(err);
    }
    );

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/job_interview');
}

const insertData = async () => {
    await user.deleteMany({});
    await user.insertMany(dbdata.data);
    console.log("added succesfully...");
    user1=await user.find({"firstname" :"Utsav"});
    console.log(user1);
}

insertData();



const insertNotificationData = async () => {
    user1=await user.find({"firstname" :"Utsav"});
    console.log(user1);
            const notificationData = {
                "userId": user1.firstname,
                "message": "New job posting available",
                "timestamp": "2022-02-15T14:30:00.000Z",
                "isRead": false,
                "alert": false,
                "priority": "low",
                "category": "application",
                "jobType":"630a12345678901234567890", // references JobType model
                "__v": 0
            };

            await notification.create(notificationData);
        

 }


insertNotificationData();
