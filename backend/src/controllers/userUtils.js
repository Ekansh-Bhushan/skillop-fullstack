const User = require("../models/user");
const Notification = require("../models/notification");
const NotificationType = require("../enums/notificationType");
const Mentor = require("../models/mentor");

exports.followUnfollowUser = async (req, res) => {
    try {
        const userToFollow = await User.findOne({ _id: req.params.userId });
        // console.log(req.params.userId, userToFollow)
        const loggedInUser = await User.findOne({ _id: req.user._id });
        if (!userToFollow) {
            res.status(404).send({
                result: false,
                message: "User doesnot exist!"
            })
        }
        if (userToFollow._id.toString() === loggedInUser._id.toString()) {
            return res.status(400).send({
                result: false,
                message: "You cannot follow yourself!"
            })
        }
        // console.log(loggedInUser)

        if (loggedInUser.followings.includes(userToFollow._id)) {
            // console.log("😸", userToFollow)
            const indexFollowing = loggedInUser.followings.indexOf(userToFollow._id);
            const indexFollower = userToFollow.followers.indexOf(loggedInUser._id);

            loggedInUser.followings.splice(indexFollowing, 1);
            userToFollow.followers.splice(indexFollower, 1);

            await loggedInUser.save();
            await userToFollow.save();
            return res.status(200).send({
                result: {following: false},
                message: "User Unfollowed"
            })
        }
        // console.log("😸")
        loggedInUser.followings.push(userToFollow._id);
        userToFollow.followers.push(loggedInUser._id);
        // console.log(loggedInUser.followings, userToFollow.followers)

        // sending notification that you have a new follower
        const notification = new Notification({
            message: `${loggedInUser.firstname} ${loggedInUser.lastname} started following you`,
            type: NotificationType.FOLLOW,
            link: `/profile/${loggedInUser._id}`,
            fromUserProfileImg: loggedInUser.profilePicUrl,
        });
        await notification.save();
        userToFollow.notifications.push(notification._id);


        await loggedInUser.save();
        await userToFollow.save();

        res.status(200).send({
            result: {following: true},
            message: "User followed"
        })
    } catch (error) {
        res.status(500).send({
            err: error.message,
            message: "Internal server error"
        })
    }


}

exports.getProfileFromMentorId = async (req, res) => {
    try {
        const mentorId = req.params.mentorId;
        const mentor = await User.findOne({mentor: mentorId});
        if (!mentor) {
            return res.status(404).send({
                result: false,
                message: "Mentor not found"
            })
        }

        res.status(200).send({
            result: mentor,
            message: "Mentor found"
        })
    } catch (error) {
        res.status(500).send({
            err: error.message,
            message: "Internal server error"
        })
    }
}