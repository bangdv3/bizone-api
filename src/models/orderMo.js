// Customer Model - Mar 21, 2020 - Author: bangdv

// 01. Include mongoose to manipulate mongoDB.
// 02. Declare schema and validate any attribute of collection
// 03. Export the model as Class for API can use.
// 04. Keep this code in /models 

const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
    item_id: String,
    price: Number,
    qty: Number,
    service: String 
});
const orderSchema = new mongoose.Schema({
    // app_id: {

    // },
    code: Number,
    status: {
        type: String, 
        enum: ['draft', 'invoiced', 'paid', 'waiting_op', 'op_done', 'done', 'canceled'],
        required: true,
        default: 'draft'
    },
    //amount
    lines: [lineSchema],
    sub_total   : { type: Number, required: true },
    discount    : { type: Number, required: true, default: 0 },
    total       : { type: Number, required: true },
    paid        : { type: Number, required: true, default: 0 },
    remaining   : { type: Number, required: true }, 
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    sale_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invoice_id: {
        type: String
    },
    isInvoiced: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);

