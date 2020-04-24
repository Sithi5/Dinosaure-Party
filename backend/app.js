const express = require('express');
const app = express();
//parsing the get/post infos
const bodyParser = require('body-parser');
//mongoose to connect to mongodb
const { mongoose } = require('./config/db.js');
const User = require('./models/User');
const auth = require('./config/auth');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//controllers
const UsersController = require('./controllers/UsersController.js');
const AuthController = require('./controllers/AuthController.js');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    })
    .use(bodyParser.json());

//passport config
passport.use(new LocalStrategy({
        usernameField: 'login'
    },
    function(username, password, done) {
        User.findOne({ login: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect login.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

app.use('/auth', AuthController);
app.use('/users', auth, UsersController);
app.use('/test', (req, res) => {
    console.log('requete bien recu !');
    console.log(req);
});

// Catch unauthorised errors
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

module.exports = app;