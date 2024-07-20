const express=require('express');
const app=express();
// const user=require('./models/user');
const port=8080;
let methodOverride = require('method-override')
let engine = require('ejs-mate');
const path = require("path");  


app.engine('ejs', engine);
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

const mongoose = require('mongoose');
const users=require('./models/user')
const Schema = mongoose.Schema;


app.listen(port,(req,res)=>
{
    console.log("Connected successfully...");
})




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




app.get("/user",(req,res)=>
{
    res.send("hii");
})

app.get("/register",(req,res)=>
{
    res.render("pages/register.ejs");
})

app.post("/register/new",async (req,res)=>
{
    let {firstname,lastname,email,password}=req.body;
    await users.create({firstname,lastname,email,password});
    res.redirect("/signin");
})

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

app.get('/dashboard',(req,res)=>
{
    res.render("pages/dashboard.ejs");
})