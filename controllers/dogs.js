//dog routes
const express = require('express');
const db = require('..models');
const router = express.Router()

app.get('dogs/show', function(req, res){
    db.dogs.findbyId(req.params.id).then(function(doggo){
        let apiId = dog.id;
        let url = ""
        request(url, function(error, response, body){
            let image = JSON.parse(body);
            let desc = JSON.parse(body).description.$t
            let 
        })
    })
})
module.exports = router;