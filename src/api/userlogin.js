// Login API - Mar 22, 2020 - Author: bangdv

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

function validateLoginRequest(reqBody){
    const schema = { 
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
    };
    return valiUser = Joi.validate(reqBody, schema); 
}

router.post('/api/auth', async (req, res) =>{
    const {error} =  validateLoginRequest(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password');

    const isLogged = await bcrypt.compare(req.body.password, user.password);
    if (!isLogged) return res.status(400).send('Invalid email or password 2');

    const token = user.genAuthToken();
    const jsonReturn = {
        user: {
            name: user.name, 
            email: user.email
        },
        token: token
    }
    res.send(jsonReturn);
})

module.exports = router