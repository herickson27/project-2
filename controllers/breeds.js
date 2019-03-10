//breed routes: CRRU
const express = require('express');
const db = require('../models');
const router = express.Router()
const request = require('request');

//POST dog of breed to database
router.post('/', function(req, res){
    console.log("REQQQQQQQQQQQQQQQQQQQQ🐶", req.body)
    db.user.findById(req.user.id).then(function(user){
    db.breed.findOrCreate({
        where: {
            breedName: req.body.breedName, 
            //
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

//params: not private information in the url. req.body is private info for passing an object
router.get('/mybreeds/:userId', function(req, res){
    db.breed.findAll({
        //querying is done ^^
        where: {userId: req.params.userId}
    }).then(function(breeds){
        console.log('returning breeds', breeds)
        res.render('breeds/index', {breeds: breeds})
    }).catch(function(error){
        res.send('Error in My Breeds Get Route', error)
    });
});
//my dogs is the list page/___:breed/:and specific user
router.get('/mydogs/:breed/:userId', function(req, res){
    db.
})

router.get('/:id', function(req, res){
    db.breeds.findById({
        where: {id: parseInt(req.params.id)}
    }).then(function(breedName){
        res.render('breeds/show', {breedName});
    });
});



module.exports = router;