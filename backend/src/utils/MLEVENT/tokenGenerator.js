const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.teamLeaderEmail }, // Payload
        process.env.JWT_KEY, // Secret key from environment variables
        { expiresIn: '1h' } // Token expiration time
    );
};

module.exports = generateToken;
