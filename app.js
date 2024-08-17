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


app.use("/api/v1", (req, res) => {
    res.send("hello kem che bhai!!");
});

const { createUser,getAllUser,getUserById,updateUser,deleteUser } = require('./controller/usercontroller.js');
app.use("/user",createUser)
app.use("/users",getAllUser)
app.use("/",getUserById)

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
  }
finally{
  console.log("No error");
}
});

app.get("/signin",(req,res)=>
{
    res.render("pages/index.ejs");
})


app.post("/signin",async(req,res)=>
{
    let{email,password}=req.body;
    let obj=await users.findOne({email,password});
    if(obj)
    {
        res.redirect('/dashboard');
    }
    else{
        console.log("User not found");
    }
})

