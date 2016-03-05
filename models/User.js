var mongoose = require('mongoose');
var util = require('util');
function baseUserSchema() {
    var any = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        any[_i - 0] = arguments[_i];
    }
    mongoose.Schema.apply(this, arguments);
    this.add({
        username: String,
        password: String,
        email: String,
        posts: Array,
        friends: Array,
        avatar: String
    });
}
exports.baseUserSchema = baseUserSchema;
util.inherits(baseUserSchema, mongoose.Schema);
exports.userSchema = new baseUserSchema();
exports.userModel = mongoose.model("User", exports.userSchema, "users");
var User = (function () {
    function User(_username, _password, _email, _posts, _friends, _avatar) {
        this._username = _username;
        this._password = _password;
        this._email = _email;
        this._posts = _posts;
        this._friends = _friends;
        this._avatar = _avatar;
        this._modelInstance = new exports.userModel({ username: _username, password: _password, email: _email, posts: _posts, friends: _friends, avatar: _avatar });
    }
    ;
    User.prototype.getInstance = function () {
        return this._modelInstance;
    };
    User.prototype.getUsername = function () {
        return this._username;
    };
    User.prototype.getPassword = function () {
        return this._password;
    };
    User.prototype.getEmail = function () {
        return this._email;
    };
    User.prototype.getAvatar = function () {
        return this._avatar;
    };
    User.prototype.getPosts = function () {
        return this._posts;
    };
    User.prototype.addPost = function (post) {
        this._friends.push(post);
    };
    User.prototype.getFriends = function() {
        return this._friends;
    };
    User.prototype.addFriend = function (friend) {
        this._friends.push(friend);
    };
    return User;
})();
exports.User = User;