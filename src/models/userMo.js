// User Model - Mar 21, 2020 - Author: bangdv

// 01. Include mongoose to manipulate mongoDB.
// 02. Declare schema and validate any attribute of collection
// 03. Export the model as Class for API can use.
// 04. Keep this code in /models 

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5, 
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5, 
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5, 
        maxlength: 1024,
        required: true
    },
    role: {
        type: String,
        enum: ['sale', 'opt', 'admin', 'customer', 'none'],
        default: 'none'
    }
});

userSchema.methods.genAuthToken = function() {
    const token = jwt.sign({_id: this._id, role: this.role}, config.get('jwtPrivateKey'));
    return token
}

module.exports = mongoose.model('User', userSchema);
