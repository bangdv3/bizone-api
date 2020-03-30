// User API - Mar 21, 2020 - Author: bangdv

// 01 - include express, declare Router to Process request
// 02 - export router at the end of module
// 03 - process GET/POST/PUT/DELETE with router.get|post|put|delete()
//      - validate req.body input
//      - if req meets the requirement, control logic and respones result to client

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()
const Joi = require('joi');
const User = require('../models/userMo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const authen = require('../mware/authenToken');

function validateUser(reqBody){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
    };
    return valiUser = Joi.validate(reqBody, schema); 
}

//GET all
router.get('/api/users/', async (req, res) => {
    const users = await User.find()
    res.status(200).send(users)
});

//GET logged user: 
router.get('/api/users/me', authen, async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password'); 
    res.send(user);
});

//POST : 1-validate : 2-save : 3-response
router.post('/api/users', async (req, res) =>{
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('The email is in used')
    
    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    user = await user.save();

    const token = user.genAuthToken();
    res.header('x-auth-token', token).send(user); 
});

// //PUT : 1-validate : 2-try update : 3-response 404 or user
// router.put('/api/users/:id', async (req, res) => {
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
//         return res.status(404).send('wrong ID');
//     const {error} = validateUser(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     if (!user) return res.status(404).send('User Not found ')
//     res.send(user);
// });

// router.delete('/api/users/:id', async (req, res) => { 
//     if(!mongoose.Types.ObjectId.isValid(req.params.id)) 
//         return res.status(404).send('wrong ID');
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).send('User Not found ')
//     res.send(user);
// })

module.exports = router
