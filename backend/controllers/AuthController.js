const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const crypto = require("crypto");
const passport = require('passport');
const mongoose = require('mongoose');

//adding model
const User = require('../models/User');

//services
const userService = require('../service/userService');
//auth loggin
router.post('/signin', function(req, res, next) {
    console.log('trying to sign in !');

    passport.authenticate('local', function(err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            console.log('Sign in success');
            console.log(user);
            token = user.generateJwt();
            res.status(200).json({
                "token": token
            });
        } else {
            console.log('User not found with this credential');
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res, next);
});

//auth signup
router.post('/signup', (req, res) => {
    console.log('trying to sign up !');
    userService.register(req, res);
});



module.exports = router;