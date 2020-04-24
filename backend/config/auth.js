var mongoose = require('mongoose');
const User = require('../models/User');

const jwt = require('express-jwt');
//set env from env file
const dotenv = require('dotenv');
dotenv.config();
const auth = jwt({
    secret: process.env.SECRET,
    requestProperty: 'payload'
});

module.exports = auth;