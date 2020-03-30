const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston')

module.exports = function(){
    const connection = `mongodb+srv://${config.get("dbuser")}:${config.get("dbpass")}@${
        config.get("dbserver")}/${config.get("dbname")}?retryWrites=true&w=majority`
    mongoose.connect(connection, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log(`Connected MongoDB ${config.get("dbserver")}/${config.get("dbname")}`))
    .catch(err=> console.log('could not connect to mongodb', err));
}