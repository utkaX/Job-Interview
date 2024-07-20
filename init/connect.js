const express = require('express');
const app = express();
const mongoose = require('mongoose');

let user = require("../models/user.js");
let dbdata=require("./data.js");

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

const insertData = async ()=>
    {
        await user.deleteMany({});
        await user.insertMany(dbdata.data);
        console.log("added succesfully...");
    }

insertData();