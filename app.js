const express = require('express');
const app = express();
const port = 8080;

let methodOverride = require('method-override');
let engine = require('ejs-mate');
const path = require("path");
app.engine('ejs', engine);
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
const users = require('./models/user.js');
const user = require('./models/user.js');
const Schema = mongoose.Schema;

app.use(express.json());

app.listen(port, () => {
    console.log("Connected successfully...");
});

main().then(() => {
    console.log("Connected to db.");
})
.catch(err => {
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/job_interview');
}



const userRoutes  = require('./routes/user');
const auth  = require('./routes/Auth.js');
app.use("/users",userRoutes)
app.use("/auth",auth)


