var mongoose = require("mongoose");
exports.foodpostSchema = new mongoose.Schema({
    datetime: Date,
    locationname: String,
    lat: Number,
    long: Number,
    photo: String,
    rating: Number,
    upvotes: Number,
    review: String,
    comments: Array,
    owner: String  
});

exports.foodpostModel = mongoose.model("FoodPost", exports.foodpostSchema, "foodposts");
var FoodPost = (function () {
    function FoodPost(_datetime, _locationname, _lat, _long, _photo, _rating, _upvotes, _review, _comments, _owner) {
        this._datetime =  _datetime;
        this._locationname = _locationname;
        this._lat = _lat;
        this._long = _long;
        this._photo = _photo;
        this._rating = _rating;
        this._upvotes = _upvotes;
        this._review = _review;
        this._comments = _comments;
        this._owner = _owner;
        this._modelInstance = new exports.foodpostModel({datetime: this._datetime, locationname: this._locationname, lat: this._lat, long: this._long, photo: this._photo, rating: this._rating, upvotes: this._upvotes, review: this._review, comments: this._comments, owner: this._owner});
    }
    ;
    FoodPost.prototype.getInstance = function () {
        return this._modelInstance;
    };
    return FoodPost;
})();
module.exports.FoodPost = FoodPost;