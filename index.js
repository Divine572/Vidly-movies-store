require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');

app = express();

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

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/vidly')
    // { useNewUrlParser: true },
    // { useUnifiedTopology: true },
    // { useCreateIndex: true } )
    .then(() => console.log('Connected to mongodb..'))
    .catch(err => console.error('Could not connect to mongodb server..'));



app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}.....`));