var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true  
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

var userModel = module.exports = mongoose.model('User', userSchema);
module.exports.get = function(callback, limit){
    userModel.find(callback).limit(limit);
}