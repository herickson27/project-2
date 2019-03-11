//breed routes: CRRU
const express = require('express');
const db = require('../models');
const router = express.Router()
const request = require('request');

//POST dog to database when you click "Add to Favorites" on the results page
// router.post('/', function(req, res) {
//     console.log("jjjjj🐶", req.body)
//     db.pup.findOrCreate({
//         where: {
//             apiId: req.body.apiId,
//             name: req.body.name,
//             breedName: req.body.breedName,
//             sex: req.body.sex,
//             age: req.body.age
//         }
//     }).spread(function(pup, created){
//         //new db query for user
//         db.user.findById(req.body.currentUser.id)
//         .then(function(user){
//             //grabbing the pup that the logged in user added
//             pup.addUser(user).then(function(user){
//                 console.log('added favies succesfully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
//                 res.status(200).redirect('profile', 200, pup)
//             });
//         });
//     });
// });
router.post('/', function(req, res) {
	console.log(req.body)
	db.pup.findOrCreate({
	    where: { apiId: req.body.apiId },
        defaults: {name: req.body.name,
            breedName: req.body.breedName,
            sex: req.body.sex,
            age: req.body.age}
	})
	.spread(function(pup, created){
        console.log("USER INFO WHEN THE ROUTE IS CALLED", req.body.currentUserId)
		db.user.findById(req.body.currentUserId)
		.then(function(user){
			pup.addUser(user)
			.then(function(){
				console.log("Association complete!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
			}).catch(function(err){
				console.log(err);
				res.send("Ahhh!")
			})
			res.status(200).redirect('profile', 200, pup)

		})
		.catch(function(err){
			console.log(err);
			res.send("Oops")
		})
	})
});

// GET route to display all user's favorite breeds on their profile
//params: not private information in the url. req.body is private info for passing an object
router.get('/mybreeds/:userId', function(req, res){
    db.pup.findAll({
        include: [db.user],
        raw: true
    })
    .then(function(dogs){
        // filters all dogs to only dogs faved by the user
        const getUser = (item) => {
            item.userId == req.body.currentUserId
        }
        dogs.filter(getUser)
        // maps the array of dog objects to an array of breedNames
        dogBreeds = dogs.map(function(d){
            return d.breedName
        })
        
        // filters out duplicate breeds
        const arrayUnique = function (arr) {
            return arr.filter(function(item, index){
                return arr.indexOf(item) >= index;
            });
        };
        const breedList= arrayUnique(dogBreeds);
        console.log("Success", breedList);
        res.status(200).render('main/myBreeds', {breedList: breedList})
    }).catch(function(error){
        console.log(error)
    });
});

//my dogs is the list page/___:breed/:and specific user
router.get('/mydogs/:breed/:userId', function(req, res){
    db.pup.findAll({
        where: {breedName: req.params.breed},
        include: [db.user],
        raw: true
    })
    .then(function(dogs){
        // filters all dogs to only dogs faved by the user
        const filterUser = (item) => {
            item.userId == req.body.currentUserId
        }
        dogs.filter(filterUser)
        res.render('main/myDogs', {dogs: dogs, breed: req.params.breed})
    })
    .catch(function(error){
        console.log(error)
    });
});
// router.get('/:id', function(req, res){
//     db.breeds.findById({
//         where: {id: parseInt(req.params.id)}
//     }).then(function(breedName){
//         res.render('breeds/show', {breedName});
//     });
// });



module.exports = router;