const User = require("../models/user");
const Notification = require("../models/notification");
const NotificationType = require("../enums/notificationType");


exports.registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            res.status(400).send({
                result: false,
                err: "All fields are required",
                message: "Please fill all the fields",
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(409).send({
                result: false,
                err: "User already exist with this email",
                message: "Try logging in instead",
            });
        }

        user = await User.create({
            firstname,
            lastname,
            email,
            password,
        });

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        const token = await user.generateToken();

        res.status(201).cookie("token", token, options).send({
            message: "User logged in successfully",
            result: user,
            token,
        });
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).send({
                result: false,
                err: "All fields are required",
                message : "Please fill all the fields"
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).send({
                result: false,
                err: "User not found",
                message: "Please register first",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).send({
                result: false,
                err: "Invalid password",
                message: "Please enter correct password",
            });
        }

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        const token = await user.generateToken();

        res.status(200).cookie("token", token, options).send({
            message: "User logged in successfully",
            result: user,
            token,
        });
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        if (!req.cookies.token) {
            return res.status(400).send({
                result: false,
                err: "Already logged out",
                message: "Please login first",
            });
        }
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .send({
                result: true,
                message: "User logged out successfully",
            });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                result: false,
                err: "Please provide old and new password",
                message: "Please fill all the fields",
            });
        }
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).send({
                result: false,
                err: "Invalid password",
                message: "Please enter correct password",
            });
        }

        user.password = newPassword;
        await user.save();

        // create a notification
        const notification = await Notification.create({
            message: "Password changed successfully",
            type:NotificationType.PASSWORD_CHANGED,
        });
        res.status(200).send({
            result: true,
            message: "Password changed successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "internal server error",
        });
    }
};
