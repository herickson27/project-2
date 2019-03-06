//breed routes: CRRU
const express = require('express');
const db = require('../models');
const router = express.Router()
const request = require('request');
//create new breed list 
router.post()

//read/view Breed page 
router.get('/:id', function(req, res){
    db.breed.findOne({
        where: {id: parseInt(req.params.id)},
    }).then(function(author){
        res.render('breed/show', {breed});
    });
});
//read/view breedComments

//delete breed list
router.delete('/:id', function(req, res){
    db.breed.destroy({
        where: {id: req.params.id}
    }).then(function(){
        res.redirect('breed/show')
    });
});

modedule.exports = router;