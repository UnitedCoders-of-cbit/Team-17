//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://pavankumart:13a14as1@cluster0.b6dce5l.mongodb.net/userDB",{useNewUrlParser:true})
.then(() => console.log("Connected"))
.catch(err => console.log(err));
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const userSchema=({
  email:String,
  password:String
});
const User=new mongoose.model("User",userSchema);


app.get("/", function(req, res){
     res.render("home");
});
app.get("/register",function(req,res){
  res.render("register");
})
app.get("/login",function(req,res){
  res.render("login")
});
app.get("/c",function(req,res){
  res.render("c");
});
app.get("/python",function(req,res){
  res.render("python");
});
app.get("/java",function(req,res){
  res.render("java");
});
app.post("/register",function(req,res){
  const newUser=new User({
    email:req.body.username,
    password:req.body.password
  });
  newUser.save(function(err){
    if(!err){
      res.redirect("/");
    }else{
      console.log(err);
    }
  });
});
app.post("/login",function(req,res){
  const username=req.body.username;
  const password=req.body.password;

  User.findOne({email:username},function(err,foundOne){
    if(err){
      console.log(err);
    }else{
      if(foundOne.password===password){
        res.redirect("/");
      }
    }
  });
});
app.post("/",function(req,res){
  res.redirect("/register");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
