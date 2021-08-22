const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports = function() {
    // Handle uncaught exceptions in the node process
    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

    // Handle promise rejection
    process.on('unhandledRejection', (ex) => {
    throw ex;
    });



    // Log exceptions to a file and mongodb
    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/vidly',
    level: 'info'  // log level
    });

}