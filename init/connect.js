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
        await user.insertMany( {
            firstname:"Utsav",
            lastname:"kaneriya",
            email:"kane@gmail.com",
            password:"1234"
        });
        console.log(dbdata.data);
    }

insertData();