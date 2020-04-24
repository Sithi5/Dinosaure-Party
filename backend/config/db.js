const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://root:root@cluster0-zmfiv.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connection to MongoDB succeeded !'))
    .catch(error => {
        console.log('Connection to MongoDB failed ! ' + error);
    });

module.exports = mongoose;