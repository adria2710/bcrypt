const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

function authenticateToken(req, res, next) {
const token = req.headers['authorization']?.split(' ')[1];
if (!token) return res.status(401).send('acesio denegado');

jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = user;
    next();
});
}

module.exports = { authenticateToken };