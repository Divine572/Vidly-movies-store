const winston = require('winston');

module.exports = function(err, req, res, next) {
    // Logging exception
    winston.error(err.message, err);

    res.status(500).send('Something failed');
}