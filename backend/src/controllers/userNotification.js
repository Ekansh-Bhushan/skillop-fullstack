const User = require("../models/user");
const Notification = require("../models/notification");
const NotificationType = require("../enums/notificationType");
exports.getNotification = async (req, res) => {
    try {
        // v1
        // // TODO display less notification
        // const user = await User.findById(req.user._id).populate(
        //     "notifications"
        // );
        // // send the notifications newest first
        // user.notifications.reverse();
        // res.status(200).send({
        //     result: user.notifications,
        //     message: "success",
        // });
        // v2

        const limit = parseInt(req.query.limit || 10);
        const skip = parseInt(req.query.skip || 0);
        const user = await User.findById(req.user._id);
        console.log(user.notifications.map((notification) => notification.toString()));
        const notifications = await Notification.find({
            _id: {
                $in: user.notifications,
            },
        })
            .where({
                __created: {
                    $lte: Date.now(),
                },
            })
            .sort({ __created: -1 })
            .limit(limit)
            .skip(skip);
        
        res.status(200).send({
            result: notifications,
            message: "notifications fetched successfully",
            notificationType: NotificationType,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "internal server error",
        });
    }
};

exports.readNotification = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        if (!notificationId) {
            return res.status(400).send({
                result: false,
                message: "Notification id is required",
            });
        }

        // can we only check for the notification in user notification which are not read

        // const user = await User.findById(req.user._id);
        // const notification = await user.notifications.id(notificationId);
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).send({
                result: false,
                message: "Notification not found",
            });
        }
        if (notification.read) {
            return res.status(400).send({
                result: false,
                message: "Notification already read",
            });
        }
        notification.read = true;
        notification.readDate = Date.now();
        await notification.save();
        res.status(200).send({
            result: true,
            message: "notification read successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "internal server error",
        });
    }
};
