var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/passportConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created){
    if(created) {
      console.log("YA DID IT");
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account Successful Created and Logged In'
      })(req, res);
    } else {
      console.log('ya already did this dummy');
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error){
    res.redirect('/auth/signup');
  })
});

router.get('/login', function(req, res){
  res.render('auth/login');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/main/profile', 
  successFlash: 'You have successfully logged in',
  failureRedirect: '/auth/login', 
  failureMessage: 'Invalid username and/or password'
}));

router.get('/logout', function(req, res){
  req.logout();
  req.flash('Success', 'You have successfully logged out');
  res.redirect('/');
});


module.exports = router;
//need to write logic for the POST of these forms