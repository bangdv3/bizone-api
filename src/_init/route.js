const express = require('express');
const routeUser = require('../api/user');
const routeAuth = require('../api/userlogin');
const routeCustomer = require('../api/customer');
const routeOrder = require('../api/order');
const error = require('../mware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use(routeUser);
    app.use(routeAuth);
    app.use(routeCustomer);
    app.use(routeOrder);
    app.use(error)
    app.use((req,res, next)=> {
        res.status(404).send('Oh Baby, Not found anything here');
    })
}