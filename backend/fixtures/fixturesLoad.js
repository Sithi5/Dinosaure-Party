const { mongoose } = require('../config/db.js');
//services
const User = require('../models/User');
const userService = require('../service/userService');

var womenNames = ['apple', 'orange', 'citrus', 'Kimn', 'Mariana', 'Patty', 'Claudia', 'Jelena', 'Taria', 'Honour', 'Lovelyn', 'Quanah', 'Petunia'];
var menNames = ['Donnelly', 'Finley', 'Israel', 'Farnell', 'Celestino', 'Beecher', 'Aristides', 'Joaquin', 'Bailee', 'Rory', 'Washington', 'Babak', 'Digby'];
var names = womenNames.concat(menNames);
var family = ['Tyrannosaures', ' Sauropodes', 'Cératopsiens', 'Raptors', 'Théropodes', 'Titanosaures', 'Ankylosaures', 'Ornithopodes'];
var race = ['Brachiosaure', ' Carnotaurus', 'Hyléosaure', 'Alamosaure', 'Microraptor', 'Oviraptor', 'Ptérosaure'];
var food = ['bacon', 'humains', 'plantes'];
var color = ['bleu', 'blanc', 'rouge'];

User.deleteMany({}, (err, docs) => {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
});

var users = [];

for (let i = 0; i < 10; i++) {
    var user = new User();

    user.login = names[Math.floor(Math.random() * names.length)] + 'du' + Math.round(Math.random() * 95);
    user.age = Math.round(Math.random() * 80 + 10);
    user.family = family[Math.floor(Math.random() * family.length)];
    user.race = race[Math.floor(Math.random() * race.length)];
    user.color = color[Math.floor(Math.random() * color.length)];
    user.food = food[Math.floor(Math.random() * food.length)];

    users.push(user);
}

users.forEach(user => {
    user.save(function(err) {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                console.log('Login deja pris', 'login');
            }
        } else {
            console.log('OK');
        }
    });
});