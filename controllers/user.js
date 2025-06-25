const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

//for signup form
module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs")
}

//for signup successfully
module.exports.registerNewUser = async(req, res) => {
    try{
        let {username, email, password} = req.body;
    let newUser = new User({email, username});
    const registredUser = await User.register(newUser, password);
    req.login(registredUser, (err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Aeronest");
        res.redirect("/listings");
    })
    // console.log(registredUser);
    } catch(e){
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}

//for render login form
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs")
}

//for successful login
module.exports.userLogin = async(req, res)=>{
        req.flash("success", "Welcome back. you have been loged in")
        let redirectUrl = res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl);
}

// for logout user
module.exports.userLogout = (req, res, next) =>{
    req.logout((err) => {
        if(err) {
            return next(err)
        }
        req.flash("success", "You are successful logged out")
        res.redirect("/listings");
    });
}