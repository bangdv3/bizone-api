
const config = require('config');

module.exports = function(){
    if (!config.get('jwtPrivateKey')) {
        console.log('jwtPrivateKey is required')
        throw new Error('jwtPrivateKey is required')
        //process.exit(1)
    }
}