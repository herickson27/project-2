const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
    db.user.findById(id).then(function(user){
        cb(null, user);
    }).catch(cb);
});

//with a new and uppercase following is basically calling a class - constructor function for the local stragegy. Making an object from a class. ex. buidling a house from the blueprint of the house. 
passport.use(new LocalStrategy({
    usernameField: 'email', 
    passwordField: 'password'
},function(email, password, cb) {
    db.user.findOne({
        where: {email: email}
    }).then(function(user) {
        if (!user || !user.validPassword(password)){
            cb(null, false);
        } else {
            cb(null, user);
        }
    }).catch(cb);
}));



module.exports = passport;