const express = require("express");
const app = express();
// const user=require('./models/user');
const port = 8080;
let methodOverride = require("method-override");
let engine = require("ejs-mate");
const path = require("path");

app.engine("ejs", engine);
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const users = require("./models/user.js");
const employeer = require("./models/employer.js");
const jobSeeker = require("./models/JobSeeker.js");
const user = require("./models/user.js");
const Schema = mongoose.Schema;

app.listen(port, (req, res) => {
  console.log("Connected successfully...");
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/job_interview");
}
main()
  .then(() => {
    console.log("Connected to db.");
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/get",async ()=>
// {
// await users.create();
// await employeer.create();
// await jobSeeker.create();

// })

// app.get("/user",(req,res)=>
// {
//     res.send("hii");
// })

app.get("/register", (req, res) => {
  console.log("hii");
  res.render("pages/register.ejs");
});

app.post("/register/new", async (req, res) => {
  try {
    let { email, password, roles } = req.body;
    // const role =document.getElementById("roles");
    console.log(email);
    const existUser =await users.findOne({ email });
    if (existUser) {
    //   console.alert("User already exist.");
    console.log("user exist");
      return res.status(400);
    }
    const role = roles;
    const user = new users({ email, password, role });
    user.save();
    res.redirect("/signin");
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/signin",(req,res)=>
{
    res.render("pages/index.ejs");
})

// app.post("/signin",async(req,res)=>
// {
//     let{email,password}=req.body;
//     let obj=await users.findOne({email,password});
//     if(obj)
//     {
//         res.redirect('/dashboard');
//     }
//     else{
//         console.log("User not found");
//     }
// })

// app.get('/dashboard',(req,res)=>
// {
//     res.render("pages/dashboard.ejs");
// })
