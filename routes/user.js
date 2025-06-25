const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")

router.route("/signup")
.get(userController.renderSignUpForm) // to get signup form
.post(wrapAsync(userController.registerNewUser)); //to submit signup form - registred user


router.route("/login")
.get(userController.renderLoginForm) //to get login form
.post( 
    saveRedirectUrl,
    passport.authenticate("local",
        {failureRedirect: "/login", failureFlash: true }),
        userController.userLogin
    ); //to authenticate and successful login user

// to logout user
router.get("/logout", userController.userLogout);

module.exports = router;