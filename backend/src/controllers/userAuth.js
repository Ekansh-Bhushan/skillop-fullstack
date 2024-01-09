const User = require("../models/user");
const Notification = require("../models/notification");
const NotificationType = require("../enums/notificationType");
const { OAuth2Client } = require("google-auth-library");
const generateUsername = require("../utils/generateUsername.utils");

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
                message:
                    "User already exist with this email! You can login instead.",
            });
        }
        // console.log("email", email);

        const username = await generateUsername(email, firstname, lastname, 10);
        // console.log("username", username);

        user = await User.create({
            firstname,
            lastname,
            email,
            password,
            username,
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
                message: "Please fill all the fields",
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
                message: "Please provide old and new password",
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

exports.googleIdVerifyAndLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { token } = req.body;
        const client = new OAuth2Client();
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload["sub"];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            console.log(userid);
            const email = payload.email;
            const name = payload.name;
            const user = await User.findOne({ email });
            // put a random password
            if (!user) {
                const newUser = await User.create({
                  firstname: name.split(' ')[0],
                  lastname: name.split(' ')[1] || ' ',
                  email,
                  googleID: userid,
                  password: '0YjIifQ.NCuZg968jj',
                });
                const options = {
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };

                const token = await newUser.generateToken();

                res.status(201).cookie("token", token, options).send({
                    message: "User logged in successfully",
                    result: newUser,
                    token,
                    type: "new",
                });
            } else {
                const options = {
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                };

                const token = await user.generateToken();

                return res.status(201).cookie("token", token, options).send({
                    message: "User logged in successfully",
                    result: user,
                    token,
                    type: "old",
                });
            }
        }

        const data = await verify();
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};
