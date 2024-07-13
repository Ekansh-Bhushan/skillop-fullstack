const User = require("../models/user");
const jwt = require("jsonwebtoken");
exports.isAuthorised = async (req, res, next) => {
    try {
        // const token = req.cookies.token;
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[1]; // Get the token part after "Bearer"

        // console.log(token);
        if (!token) {
            return res.status(401).send({
                result: false,
                err: "Unauthorized",
            });
        }
        console.log('JWT Token (Middleware):', token);
        // console.log(process.env.JWT_KEY);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // console.log(decoded, decoded._id)
        const user = await User.findById(decoded._id);
        //  console.log(user)

        if (!user) {
            return res.status(404).send({
                result: false,
                err: "User not found",
            });
        }

        user.__lastVisited = Date.now();
        const savedUser = await user.save();
        req.user = savedUser;
        // console.log(user)
        next();
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};

exports.isMentor = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user.isMentor) {
            return res.status(403).send({
                result: false,
                err: "Forbidden: You are not a mentor",
                message: "Only mentors can have this access",
            });
        }
        next();
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user.isAdmin) {
            return res.status(403).send({
                result: false,
                err: "Forbidden: You are not an admin",
                message: "Only admins can have this access",
            });
        }
        next();
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};
