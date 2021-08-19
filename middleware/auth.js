const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function auth(req, res, next) {
    // 401 Unauthorized
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('Access denied. No token provided');


    // Verifying token
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));  // returns decoded payload
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid token.')
    }
}



