// Customer API - Mar 21, 2020 - Author: bangdv

// 01 - include express, declare Router to Process request
// 02 - export router at the end of module
// 03 - process GET/POST/PUT/DELETE with router.get|post|put|delete()
//      - validate req.body input
//      - if req meets the requirement, control logic and respones result to client

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()
const Joi = require('joi');
const Customer = require('../models/customerMo');
const authen = require('../mware/authenToken');
const authorize = require('../mware/authorRole')
const valiObjectID = require('../mware/valiObjectId')

function validateCustomer(reqBody){
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required()
    };
    return valiUser = Joi.validate(reqBody, schema); 
}

//GET all
router.get('/api/customers/all', [authen], async (req, res) => {
    const customers = await Customer.find()
    res.status(200).send(customers)
});

//GET : 
router.get('/api/customers/:id', async (req, res)=>{
    throw new Error('Some error for testing only...')
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
        return res.status(404).send('wrong ID');
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer Not found ')
    res.send(customer);
    
});

//POST : 1-validate : 2-save : 3-response
router.post('/api/customers', authen, async (req, res) =>{
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let customer = new Customer(req.body);
    customer = await customer.save();
    res.send(customer); 
});

//PUT : 1-validate : 2-try update : 3-response 404 or customer
router.put('/api/customers/:id', valiObjectID, async (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
        return res.status(404).send('wrong ID');
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!customer) return res.status(404).send('Customer Not found ')
    res.send(customer);
});

router.delete('/api/customers/:id',valiObjectID, async (req, res) => { 
    
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer Not found ')
    res.send(customer);
})

module.exports = router

