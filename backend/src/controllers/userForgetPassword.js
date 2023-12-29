const NotificationType = require("../enums/notificationType");
const User = require("../models/user");
const { sendEmail } = require("../utils/sendEmail");
const Notification = require("../models/notification");

const crypto = require("crypto");
exports.forgetPassword = async (req, res) => {
    try {
        if (!req.body.email) {
            res.status(400).send({
                result: false,
                err: "Email is required",
            });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                result: false,
                err: "User not found",
            });
        }

        const token = await user.generatePasswordReset();
        await user.save();

        const resetLink = `${req.protocol}://${req.get(
            "host"
        )}/password/reset/${token}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetLink} clicktracking=off>${resetLink}</a>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            // create notification to inform user a password request sent
            const notification = new Notification({
                message: "Password reset requested",
                type: NotificationType.PASSWORD_RESET_REQUEST,
            });
            await notification.save();

            user.notifications.push(notification);
            await user.save();

            res.status(200).send({
                result: true,
                message: "mail sent! Please check your email",
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            await user.save();

            return res.status(500).send({
                result: false,
                message: "Email could not be sent",
                err: error.message,
            });
        }
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        if (!req.body.password) {
            res.status(400).send({
                result: false,
                err: "Please provide the security code",
            });
        }
        if (!req.body.password) {
            res.status(400).send({
                result: false,
                err: "Please provide the password",
            });
        }
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).send({
                result: false,
                err: "Invalid Token or Token Expired",
            });
        }

        // create notification to inform password changed
        const notification = new Notification({
            message: "Password reset successful",
            type: NotificationType.PASSWORD_CHANGED,
        });
        await notification.save();

        user.notifications.push(notification);

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        const options = {
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        const token = await user.generateToken();

        res.status(200).cookie("token", token, options).send({
            result: true,
            message: "Password reset successful",
            token: token,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};
