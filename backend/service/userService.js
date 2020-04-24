const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;

function sendError(req, res, err, errortype) {
    console.log("error : " + JSON.stringify(err, undefined, 2));
    res.status(400);
    return res.json({
        err,
        errortype
    });
}

function checkIfAdmin(req, res) {
    console.log('checking if admin : ');
    console.log(req.payload);

    // If no user ID exists in the JWT return a 401
    if (!req.payload._id || req.payload.admin === false) {
        console.log('false');
        return (false);
    }
    console.log('true');
    return true;
}

function checkIfSameUser(req, res) {
    console.log('checking if same user : ');
    console.log(req.payload);

    // If no user ID exists in the JWT return a 401
    if (!req.payload._id || req.payload._id !== req.params.id) {
        console.log('false');
        return (false);
    }
    console.log('true');
    return true;
}

function login(req, res) {
    console.log('inside login');

    passport.authenticate('local', function(err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200).json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res, next);
}

function userHydrate(user, req) {
    var err;
    user.login = req.body.login
    if ((err = user.checkPasswordStrong(req.body.password)) !== null) {
        return (err);
    }
    user.setPassword(req.body.password);
    req.body.age ? user.age = req.body.age : 0;
    req.body.family ? user.family = req.body.family : 0;
    req.body.race ? user.race = req.body.race : 0;
    req.body.food ? user.food = req.body.food : 0;
    req.body.friends ? req.body.friends.forEach(element => {
        console.log(element);
        user.friends.push(element);
    }) : 0;
    console.log("Object hydrated!");
    console.log(user);
    return null;
}

function register(req, res) {
    var user = new User();
    var err;

    if ((err = userHydrate(user, req)) !== null) {
        return sendError(req, res, err, 'password');
    }
    console.log('trying to save new user');
    user.save(function(err) {
        if (err) {
            console.log('A problem occured when trying to add the user');
            if (err.code === 11000) {
                return sendError(req, res, 'Votre login est deja pris', 'login');
            }
            return sendError(req, res, err);
        }
        var token;
        token = user.generateJwt();
        console.log('user successfully added, sending token');
        console.log(user);
        res.status(200);
        res.json({
            "token": token
        });
    });
};

function getOneUser(req, res) {
    if (checkIfAdmin(req, res) !== true && checkIfSameUser(req, res) !== true) {
        return sendError(req, res, 'you can\'t see this content');
    }
    if (!ObjectId.isValid(req.params.id)) {
        return (res.status(400).send('No record with given id : ' + req.params.id));
    }
    User.findById(req.params.id, (err, docs) => {
        if (!err) { return res.status(200).send(docs); } else {
            return sendError(req, res, err);
        }
    });
};

function getAllUsers(req, res) {
    if (checkIfAdmin(req, res) !== true) {
        return sendError(req, res, 'you need to be admin to see this.');
    }
    User.find((err, docs) => {
        if (err) {
            return sendError(req, res, err);
        } else {
            res.status(200);
            return res.send(docs);
        }
    });
};

function deleteOneUser(req, res) {
    if (checkIfAdmin(req, res) !== true) {
        return sendError(req, res, 'you need to be admin to see this.');
    }
    if (!ObjectId.isValid(req.params.id)) {
        return (res.status(400).send('No record with given id : ' + req.params.id));
    }
    User.findOneAndDelete(req.params.id, (err, docs) => {
        if (!err) { res.status(200).send(docs); } else { sendError(req, res, err); }
    });
}

function deleteAllUsers(req, res) {
    if (checkIfAdmin(req, res) !== true) {
        return sendError(req, res, 'you need to be admin to see this.');
    }
    User.deleteMany({}, (err, docs) => {
        if (err) {
            return sendError(req, res, err);
        } else {
            res.status(200).send(docs);
        }
    });
}

function updateOneUser(req, res) {
    if (checkIfAdmin(req, res) !== true && checkIfSameUser(req, res) !== true) {
        return sendError(req, res, 'you can\'t edit this content');
    }
    if (!ObjectId.isValid(req.params.id)) {
        return (res.status(400).send('No record with given id : ' + req.params.id));
    }
    User.findById(req.params.id, (err, docs) => {
        if (err) { return sendError(req, res, err); } else {
            var user = docs;
            userHydrate(user, req);
            user.save(function(err) {
                if (err) {
                    return sendError(req, res, err);
                } else {
                    res.status(200);
                    res.send(user);
                }
            });
        }
    });
}

function getFriends(req, res) {
    console.log('trying to get friends');

    User.findById(req.payload._id, (err, docs) => {
        if (!err) {
            var friends = array();
            docs.friends.forEach(element => {});
            return res.status(200).send(docs);
        } else {
            return sendError(req, res, err);
        }
    });
}

module.exports.login = login;
module.exports.register = register;
module.exports.getOneUser = getOneUser;
module.exports.getAllUsers = getAllUsers;
module.exports.deleteOneUser = deleteOneUser;
module.exports.deleteAllUsers = deleteAllUsers;
module.exports.updateOneUser = updateOneUser;
module.exports.getFriends = getFriends;

//error 400 = badrequest
//error 404 = Not found
//status 200 = ok