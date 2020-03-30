// Product Model - Mar 21, 2020 - Author: bangdv

// 01. Include mongoose to manipulate mongoDB.
// 02. Declare schema and validate any attribute of collection
// 03. Export the model as Class for API can use.
// 04. Keep this code in /models 

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5, 
        maxlength: 50,
        required: true
    }, 
    status: {
        type: String,
        enum:['active', 'inactive'],
        default: 'active'
    }, 
    price: {
        type: Double,
        min: 0,
        max: 1000
    }
});

module.exports = mongoose.model('Item', itemSchema);