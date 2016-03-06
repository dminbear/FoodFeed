var express = require('express');
var user = require('../models/User');
var router = express.Router();
var passport = require('passport');
var app = require('../app');

router.get('/', function(req, res){
    res.render('logins', {title: 'Login'});
});

router.get('/error', function(req,res){
    res.render('logins', {title: 'Login', error: "Error! " +
    "Try again."})
});

router.post('/', function(req,res, next){
    var username = req.body.username;
    var password = req.body.password;

    console.log("Ready to log in");

    passport.authenticate('local', function(err, user, info){
       if (err){
           return next(err);
       }
        if (!user){
            return res.redirect('/login/error?');
        } else{
            return res.redirect('/home/' + user.username);
        }
    })(req,res,next);
});

module.exports = router;