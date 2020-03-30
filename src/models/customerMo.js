// Customer Model - Mar 21, 2020 - Author: bangdv

// 01. Include mongoose to manipulate mongoDB.
// 02. Declare schema and validate any attribute of collection
// 03. Export the model as Class for API can use.
// 04. Keep this code in /models 

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5, 
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum:['active', 'inactive'],
        default: 'active'
    }
});

module.exports = mongoose.model('Customer', customerSchema);

