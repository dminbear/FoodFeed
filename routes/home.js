var express = require('express');
var user = require('../models/User');
var foodPost = require('../models/FoodPost');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var passport = require('passport');
var app = require('../app');


router.get('/:username', function(req,res,next){
   res.render('/home/', {title: "Food Feed"});
});







module.exports = router;