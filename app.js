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



app.listen(port,(req,res)=>
{
    console.log("Connected successfully...");
})

app.get("/user",(req,res)=>
{
    res.send("hii");
})

app.get("/register",(req,res)=>
{
    res.render("pages/register.ejs");
})

app.post("/register/new",(req,res)=>
{
    let {firstname,lastname,email,password}=req.body;
    console.log(firstname,lastname,email,password);
    res.redirect("/signin");
})

app.get("/signin",(req,res)=>
{
    res.render("pages/index.ejs");
})