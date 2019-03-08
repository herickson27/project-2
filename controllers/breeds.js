//breed routes: CRRU
const express = require('express');
const db = require('../models');
const router = express.Router()
const request = require('request');


//POST
router.post('/', function(req, res){
    console.log("REQQQQQQQQQQQQQQQQQQQQ🐶", req.body)
    db.user.findById(req.user.id).then(function(user){
    db.breed.findOrCreate({
        where: {
            breedName: req.body.breedName, 
            userId: req.user.id
        }
    }).spread(function(breed, created){
        breed.createDog({
            apiId: parseInt(req.body.apiId),
        }).then(function(){
            res.redirect('/profile')
        });
    });
    });
});

//

module.exports = router;