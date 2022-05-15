const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const users = require('../data/users');


 
router.get("/", (req, res) => {
    if (!req.session.AuthCookie)
        res.render("users/login", { title: "Login", heading: "Login" , msg:"Login Again"});
    else
        res.redirect("/private");
});
 
router.get("/signup", (req, res) => {
    if (!req.session.AuthCookie)
        res.render("users/signup", { title: "Signup", heading: "Signup", msg:"Signup Again"});
    else
        res.redirect("/private");
});
 
 
router.post("/signup", async(req, res) => {
    //console.log(req.body);
    let checkErrors = false;
    const errors = [];
    if (!req.body.username) {
        checkErrors = true;
        res.status(400);
        return res.render("users/signup", { checkErrors: true, errors: errors, message: "Username is not supplied" });
    }
    if (!req.body.password) {
        checkErrors = true;
        res.status(400);
        return res.render("users/signup", { checkErrors: true, errors: errors, message: "Password is not supplied" });
    }
 
    if (req.body.username.length == 0) {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Username cannot be null or empty"});
    }
    
    if (typeof req.body.username != 'string') {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Username must be string"});
    }
    var regex = /^[a-zA-Z0-9.\-]{4,30}$/;
    if (!req.body.username.match(regex)) {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Username either is less than 4 characters or contains spaces"});
    }
    if (req.body.password.length == 0) {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Password cannot be null or empty" });
    }
    if (typeof req.body.password != 'string') {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Password is not String" });
    }
    var len;
    for (var i = 0, len = req.body.password.length; i < len; ++i) {
        if (req.body.password.charAt(i) === ' ') {
            checkErrors = true;
        res.status(400);
            res.render('users/signup', { errors: errors, checkErrors: true, message: "Username has spaces" });
        }
    }
    if (req.body.password.length < 6) {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Password should be greater than 6 characters" });
    }
    if (req.body.username.trim().length == 0) {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Username has spaces" });
    }
    if (req.body.password.trim().length == 0) {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { errors: errors, checkErrors: true, message: "Password has spaces" });
    }

    const userData = req.body;

    try {
        const user = await users.createUser(userData.username, userData.password);
        if(user == null)
        {
        checkErrors = true;
        res.status(400);
        res.render('users/signup', { checkErrors: true, message: "Username exits, please change username" });

        }
        else{
            if (user) {
                res.status(200).render("users/login", { message: "You have successfully signed up", title: "Login", heading: "Login" });
            } else {
                res.status(400);
                res.render("users/signup", { message: "Invalid Password or Username. Please signup again", title: "Signup", heading: "Signup" });
            }
        }
        
        
    } catch (error) {
        res.status(500);
        res.render("users/signup", { message: "Internal server error", title: "Login", heading: "Login" });
    }
 
});
 
router.post("/login", async(req, res) => {
    console.log(req.body);
    let checkErrors = false;
    var errors = [];
    if (!req.body.username){
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Username is not supplied" });
    
    } 


    if (req.body.username.length == 0) {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Username cannot be null or empty" });
    
    }
    
    if (typeof req.body.username != 'string') {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Username is not String" });
    
    }
    var regex = /^[a-zA-Z0-9.\-]{4,30}$/;
    if (!req.body.username.match(regex)) {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Username has spaces or is not greater than 4, should be alphanumeric" });
    
    }
    
    if (req.body.password.length == 0) {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Password is null or empty" });
    
    }
    
    if (typeof req.body.password != 'string') {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Password is not string" });
    
    }
    var len;
    for (var i = 0, len = req.body.password.length; i < len; ++i) {
        if (req.body.password.charAt(i) === ' ') {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Password has spaces" });
        }
    }
    if (req.body.password.length < 6) {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Password should be greater than 6 characters" });
    
    }
    if (req.body.username.trim().length == 0) {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Username has spaces" });
    
    }
    if (req.body.password.trim().length == 0) {
        checkErrors = true;
        res.status(400);
        return res.render("users/login", { checkErrors: checkErrors, errors: errors, message: "Password has spaces" });
    }
 
    const userData = req.body;
    console.log("userData", userData)
    try {
        const user = await users.checkUser(userData.username, userData.password);
       
        if (user) {
            req.session.AuthCookie = userData.username;
            req.session.user = { Username: userData.username} 
            res.status(200).render("users/private", { username: userData.username, title: "Login", heading: "Login" });
        } else {
            res.status(400);
            res.render("users/login", { message: "Invalid Password or Username", title: "Login", heading: "Login" });
        }
    } catch (error) {
        res.status(400);
        res.render("users/login", { message: "Invalid Password or Username", title: "Login", heading: "Login" });
    }
 
});
 
router.get("/private", (req, res) => {
    let user = req.session.user;
    if (!req.session.user) {
        res.redirect('/');
    } else {
        res.render('users/private', {
            username: req.session.user.Username
        });
    }
 
});
 
router.get("/logout", (req, res) => {
    if (!req.session.AuthCookie)
        res.redirect("/");
    else {
        req.session.destroy();
        res.render("users/logout", { title: "Logout", heading: "Logout", message: "User has been successfully logged out", msg: true });
    }
});
 
module.exports = router;