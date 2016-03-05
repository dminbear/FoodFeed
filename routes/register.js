var express = require('express');
var app = require('../app');
var user = require('../models/User');
var router = express.Router();
var multer  = require('multer');
var upload = multer();


// get request for register
router.get('/', function(req, res){
    res.render('register', {title: 'Register'});
});

//error
router.get('/error?', function(req,res){
   return res.render('register', {title: 'Register', error: 'Error! ' +
   'Invalid username or password. Try again.'});
});

router.post('/', upload.single('avatar'), function(req,res,next){
    console.log('Very first part of register');
    var username = req.body.username;
    if (req.body.password.length < 1){
        return res.redirect('/register/error?length=true');
    }
    var password = req.body.password;
    // perhaps incorporate encryption...
    console.log('Passed the username and password part of registration');
    var email = req.body.email;
    console.log('Email');
    if (req.file!=null){
        var base64Avatar = new Buffer(req.file.buffer).toString('base64');
        var avatar = 'data:'+req.file.mimetype +';base64,'+base64Avatar;
        console.log('Avatar varaible filled in');
        console.log(avatar);
    } else{
        var avatar = '';
    }


    console.log("new user being made");

    var newUser = new user.User(username, password, email, [], [], avatar).getInstance();
    console.log("new user variable made");

    newUser.save(function(err,data){
        console.log("gets to the save prior to if err");
       if (err){
           console.log("Unable to save new user in the database");
           console.log(err);
       } else{
           return res.redirect('/');
       }
    });

    //user.userModel.findOne({username: username}, function(obj, err){
    //    if (obj){
    //        console.log('Error with registration');
    //        return res.redirect('/register/error?taken=true');
    //    } else{
    //        console.log('New User being made');
    //        var newUser = new user.User(username, password, email, [], [], avatar).getInstance();
    //        newUser.save(function(err,data){
    //            console.log('Attempting to save new User');
    //            if (err){
    //                console.log("Error! "+ err);
    //            }else{
    //                // return res.redirect('/user/' + username);
    //                console.log("Successful implementation of register!");
    //                return res.redirect('/login');
    //            }
    //        });
    //    }
    //});

});


module.exports = router;