const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
require('dotenv').config();
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');
const app = express();
const request = require('request');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(helmet()); //extra protection for data

const sessionStore = new SequelizeStore({
  db: db.sequelize, 
  expiration: 30 * 60 * 1000 //half an hour before session logout
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true, 
  store: sessionStore
}));
//use this line once to set up the stroe table: 
// sessionStore.sync();

app.use(flash()); //needs to be after sessions, before passport
app.use(passport.initialize());
app.use(passport.session());


//hits everyroute, passing through this middleware, every route will have flash alerts on that local
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

//to use middleware, simply call in the params of the page you want it to. 
app.get('/profile', isLoggedIn, function(req, res) {
  console.log('')
  res.render('main/profile');
});

//search get/
app.get('/search', function(req, res){
  let apiUrl = `http://api.petfinder.com/breed.list?key=${process.env.API_KEY}&animal=dog&format=json`
  request(apiUrl, function(error, response, body){
    console.log("EERRRRRRRRRRRORRRRRRRRR", error);
    let breeds = JSON.parse(body).petfinder.breeds.breed; 
    let states = [ "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
    res.render('main/search', {breeds, states});
  });
});

app.get('/results', function(req, res){
  let apiUrl = `http://api.petfinder.com/pet.find?key=${process.env.API_KEY}&animal=dog&format=json&location=${req.query.state}&breed=${req.query.breed}`
  request(apiUrl, function(error, response, body){
    let dogs = JSON.parse(body).petfinder.pets.pet.contact
    res.render('main/results', {dogs});
  });
});

app.use('/auth', require('./controllers/auth'));
// app.use('/breed', require('/.routes/breed'));
// app.use('/dogs', require('.routes/dogs'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
