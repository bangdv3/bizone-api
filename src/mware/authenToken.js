const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Authentication is required')

    try {
        const decoced = jwt.verify(token, config.get('jwtPrivateKey')); 
        req.user = decoced
        next()
    }
    catch (ex) {
        res.status(400).send('invalid token')
    }  
} 