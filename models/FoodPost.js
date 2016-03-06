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
    function FoodPost(_datetime, _locationname, _photo, _rating, _upvotes, _review, _owner) {
        this._locationname = _locationname;
        this._photo = _photo;
        this._rating = _rating;
        this._upvotes = _upvotes;
        this._review = _review;
        this._owner = _owner;
        this._modelInstance = new exports.foodpostModel({datetime: this._datetime, locationname: this._locationname, photo: this._photo, rating: this._rating, upvotes: this._upvotes, review: this._review, owner: this._owner});
    }
    ;
    FoodPost.prototype.getInstance = function () {
        return this._modelInstance;
    };
    return FoodPost;
})();
module.exports.FoodPost = FoodPost;