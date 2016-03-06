var foodPost = require('../models/FoodPost');
var express = require("express");
var router = express.Router();

router.get('/feeds', function(req, res, next) {
	foodPost.find(function(err, fp) {
		if (err) return next(err);
		console.log(res.json());
	});
});

router.post('/feeds', function(req, res, next) {
	var newFoodPost = new foodPost(req.body);

	newFoodPost.save(function(err, fp) {
		if (err) return next(err);
		console.log(res.json());
	});
});

module.exports = router;


