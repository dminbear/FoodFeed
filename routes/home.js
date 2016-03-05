var express = require('express');
var user = require('../models/User');
var foodPost = require('../models/FoodPost');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var passport = require('passport');
var app = require('../app');


router.get('/:username',function(req,res,next){
   user.userModel.findOne({username: req.params.username}).exec(function(err,obj){
       if (obj!=undefined && obj!=null){
           res.locals.avatar = obj.avaar;
           res.locals.username = req.params.username;
       }
       res.render('home');
   }) ;
});


router.post('/posting', function(req,res,next){
    res.redirect('/posting');


});







module.exports = router;