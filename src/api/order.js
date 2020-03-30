// Order API - Mar 21, 2020 - Author: bangdv

// 01 - include express, declare Router to Process request
// 02 - export router at the end of module
// 03 - process GET/POST/PUT/DELETE with router.get|post|put|delete()
//      - validate req.body input
//      - if req meets the requirement, control logic and respones result to client

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()
const Joi = require('joi'); 
const Order = require('../models/orderMo');
const Customer = require('../models/customerMo');
const User = require('../models/userMo');

function validateOrder(reqBody){
    const schema = {
        code: Joi.number(),
        status: Joi.string(),
        lines: Joi.array(),
        sub_total: Joi.number().required(),
        discount: Joi.number().required(),
        total: Joi.number().required(),
        paid: Joi.number(),
        remaining: Joi.number(),
        customer_id: Joi.objectId(),
        sale_id: Joi.objectId(),
        isInvoiced: Joi.boolean()
    };
    return valiUser = Joi.validate(reqBody, schema); 
}

//GET all
router.get('/api/orders/all', async (req, res) => {
    const orders = await Order.find()
        .populate('customer_id', 'name')
        .populate('sale_id', '-password')
        .select('_id customer_id total sale_id')
    res.status(200).send(orders)
});

//GET : 
router.get('/api/orders/:id', async (req, res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
        return res.status(404).send('wrong ID');
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order Not found ')
    res.send(order);
});

//POST : 1-validate : 2-save : 3-response
router.post('/api/orders', async (req, res) =>{
    const {error} = validateOrder(req.body);
    if (error) {
        console.log(error);
        return res.status(400).send(error.details[0].message);
    }
    
    //sale is auto set by logged user
    const sale = await User.findById(req.body.sale_id)
    if (!sale) return res.status(400).send('Sale not found')

    let order = new Order(req.body); 
    order = await order.save();
    res.send(order); 
});

//PUT : 1-validate : 2-try update : 3-response 404 or order
router.put('/api/orders/:id', async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
        return res.status(404).send('wrong ID');
    const {error} = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!order) return res.status(404).send('Order Not found ')
    res.send(order);
});

// router.delete('/api/orders/:id', async (req, res) => { 
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
//         return res.status(404).send('wrong ID');
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).send('Oder Not found ')
//     res.send(order);
// })

module.exports = router

