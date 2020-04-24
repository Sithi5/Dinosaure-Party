const mongoose = require('mongoose');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

//set env from env file
const dotenv = require('dotenv');
dotenv.config();

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true,
    },
    age: {
        type: Number,
        required: false,
        unique: false
    },
    family: {
        type: String,
        required: false,
    },
    race: {
        required: false,
        type: String,
    },
    food: {
        type: String,
        enum: ['bacon', 'human', 'plant'],
        required: false,
    },
    friends: {
        type: Array,
        required: false,
    },
    hash: String,
    salt: String,

    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

//return null if no error
userSchema.methods.checkPasswordStrong = function(password) {
    console.log('Checking password strong');
    var requiredLength = 4

    if (password.length >= requiredLength) {
        console.log('true');
        return (null);
    }
    console.log('false');
    return ('Votre mot de passe doit être plus securisé, il doit avoir au moins ' + requiredLength + ' caractères');
}

userSchema.methods.validPassword = function(password) {

    hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    if (this.hash === hash) {
        console.log('password valid');
    }
    return this.hash === hash;
}

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.login,
        age: this.age,
        family: this.family,
        admin: this.admin,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.SECRET);
}

var UserModel = mongoose.model('auth', userSchema);

module.exports = UserModel;