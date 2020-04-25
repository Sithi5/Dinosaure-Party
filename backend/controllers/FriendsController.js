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
router.get('/', (req, res) => {
    userService.getFriends(req, res);
});

router.post('/:id', (req, res) => {
    console.log('trying to add friend');
    userService.addFriend(req, res);
});

module.exports = router;