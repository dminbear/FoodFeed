/**
 * Created by BearButt on 2016-03-04.
 */
var express = require('express');
var foodPost = require('../models/FoodPost');

var router = express.Router();
var multer = require('multer');
var upload = multer();


// get the make post page!
router.get('/', function(req, res){
    res.render('Posting', {title: 'posting'});
});

// post a post
// locationname: String
// photo: String
// rating: Number
// review: String
// owner: String
router.post('/', upload.fields([{name: 'photo'}, {name: 'foodPost'}]), function(req,res){
    var datetime = new Date();
    var locationname = req.body.locationname;
    var review = req.body.review;
    var rating = req.body.rating;
    // owner once we implement logging in functionality?
    if (req.files['photo'] != undefined){
        var base64Thumbnail = new Buffer(req.files['photo'][0].buffer).toString('base64');
        var photo = 'data:' + req.files['photo'][0].mimetype + ';base64,' + base64Thumbnail;
    } else {
        var photo = '';
    }
    // var owner = req.user.username;
    var owner = "OwnerBob";
    var createdPost = foodPost.FoodPost(datetime, locationname, 0,0, photo, rating, 0, review, [], owner).getInstance();
    createdPost.save(function(err, data){
        if (err){
            console.log(err + "Post is not posting!");
        } else{
            return res.redirect('/post/' + username);
        }
    });
});

module.exports = router;