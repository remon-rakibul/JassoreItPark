const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);