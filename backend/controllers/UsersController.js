const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require("crypto");
const ObjectId = require('mongoose').Types.ObjectId;
const auth = require('../config/auth');

//services
const userService = require('../service/userService');

//adding model
const User = require('../models/User');

//friends parts
//getFriends
router.get('/friends', (req, res) => {
    userService.getFriends(req, res);
});

//getAllUsers
router.get('/', (req, res) => {
    userService.getAllUsers(req, res);
});

//getOneUser
router.get('/:id', (req, res) => {
    console.log(req.payload);
    userService.getOneUser(req, res);
});

//update method
router.put('/:id', (req, res) => {
    userService.updateOneUser(req, res);
});

//delete all user
router.delete('/deleteall', (req, res) => {
    userService.deleteAllUsers(req, res);
});

//delete one user
router.delete('/:id', (req, res) => {
    userService.deleteOneUser(req, res);
});



module.exports = router;