const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secret } = require('../crypto/config');
const users = require('../data/users');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/login', (req, res) => {
const { username, password } = req.body;
const user = users.find(u => u.username === username);

if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(403).send('error contraseña o usuario');
}

const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
res.send({ message: 'login correcto', token });
});


router.get('/dashboard', authenticateToken, (req, res) => {
res.send(`<h1>bienvbenido ${req.user.username}!</h1>`);
});


router.post('/logout', (req, res) => {
res.send('logout correcto');
});

module.exports = router;