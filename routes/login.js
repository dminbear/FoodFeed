var express = require('express');
var user = require('../models/User');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

router.get('/', function(req, res){
    res.render('login', {title: 'Login'});
});

router.get('/', function(req,res){
    res.render('login', {title: 'Login', error: "Error! " +
    "Try again."})
});

router.post('/', function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    passport.authenticate('local', function(err, user, info){
       if (err){
           return next(err);
       }
        if (!user){
            return res.redirect('/login/error?');
        } else{
            return res.redirect('/posting');
        }
    })(req,res,next);
});

module.exports = router;