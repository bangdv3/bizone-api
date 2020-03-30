const winston = require('winston')
const morgan = require('morgan');
require('express-async-errors');

module.exports = function(app){
    if (app.get('env') ==='development') {
        app.use(morgan('tiny'));
        winston.info('morgan logger is enable...')
    }
    winston.add(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'logfile.log',handleExceptions: true})
    ); 
}