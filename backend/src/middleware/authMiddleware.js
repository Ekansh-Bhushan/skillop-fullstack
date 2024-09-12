// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY; // Ensure you have a JWT secret in your environment variables

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
