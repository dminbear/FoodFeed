var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var mongoose = require('mongoose');

var user = require('./models/User');

var routes = require('./routes/index');
var users = require('./routes/users');
var posting = require('./routes/posting');
var register = require('./routes/register');
var login = require('./routes/login');
var home = require('./routes/home');


var app = express();
var router = express.Router();

mongoose.connect("mongodb://team15Bizhacks:team15isawesome@ds053668.mlab.com:53668/team15bizhacks", function(obj, err){
    if (!err){
        console.log("Connected");
    }else {
        console.log("Error! Not connected: " + err);
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(router);
passport.use(new LocalStrategy(function(username, password, done){
    user.userModel.findOne({username: username}, function(err, obj){
        if (err){
            return done(err);
        }
        if (!obj){
            return done(null, false, {message: 'Username not found'});
        } if (obj.password != password){
            return done(null, false, {message: "Password incorrect"});
        }
        return done(null, obj);
    });
}));


app.use('/', routes);
app.use('/users', users);
app.use('/posting', posting);
app.use('/register', register);
app.use('/login', login);
app.use('/home', home);

// logging out
app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');

});

app.use(function(req,res,next){
   if (req.user !=undefined){
       res.locals.isUser = true;
       res.locals.username = req.user.username;
   } next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
