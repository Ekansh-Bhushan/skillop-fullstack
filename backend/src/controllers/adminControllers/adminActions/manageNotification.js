// NOTIFICATION SENDING OPTION

const Notification = require("../../../models/notification");
const User = require("../../../models/user");
const {
    response_200,
    response_500,
    response_400,
} = require("../../../utils/responseCode.utils");

const RECEIVER_TYPE = {
    MENTORS: "mentors",
    USERS: "users",
    ALL: "all",
    SELECTED: "selected",
};

exports.AdminSendNotification = async (req, res) => {
    try {
        const { link, message, usernames, dateTime, to } = req.body;
        console.log(req.body)

        const date = new Date(dateTime);
        console.log(date, typeof date)
        if (date.toString() === "Invalid Date") return response_400(res, "Invalid Date");
        const fromUserProfileImg = req.user?.profilePicUrl || "";
        const notification = new Notification({
            link,
            message,
            fromUserProfileImg,
            __created: date,
            type: "from_admin"
        });
        const savedNotification = await notification.save();

        const responseData = {
            notification: savedNotification,
            RECEIVER_TYPE,
        };
        let noOfReceiver = 0;
        if (to === "all") {
            const users = await User.find({});

            for (const user of users) {
                try {
                    user.notifications.push(savedNotification._id);
                    await user.save();
                    noOfReceiver++;
                } catch (error) {}
            }
            responseData.noOfReceiver = noOfReceiver;
            return response_200(
                res,
                "Notification sent successfully",
                responseData
            );
        } else if (to === "mentors") {
            const users = await User.find({ isMentor: true });
            for (const user of users) {
                try {
                    user.notifications.push(savedNotification._id);
                    await user.save();
                    noOfReceiver++;
                } catch (error) {}
            }
            responseData.noOfReceiver = noOfReceiver;
            return response_200(
                res,
                "Notification sent successfully",
                responseData
            );
        } else if (to === "users") {
            const users = await User.find({ isMentor: false });
            for (const user of users) {
                try {
                    user.notifications.push(savedNotification._id);
                    await user.save();
                    noOfReceiver++;
                } catch (error) {}
            }
            responseData.noOfReceiver = noOfReceiver;
            return response_200(
                res,
                "Notification sent successfully",
                responseData
            );
        }

        if (!usernames) response_400(res, "Please provide usernames");
        const toUsers = await User.find({ username: { $in: usernames } });
        for (const user of toUsers) {
            try {
                user.notifications.push(savedNotification._id);
                await user.save();
                noOfReceiver++;
            } catch (error) {}
        }
        responseData.noOfReceiver = noOfReceiver;
        response_200(res, "Notification sent successfully", responseData);
    } catch (error) {
        response_500(res, "Error while sending notification", error);
    }
};
