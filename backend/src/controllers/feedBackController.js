const User = require("../models/user");
const FeedBack = require("../models/feedBack");
const Meet = require("../models/meet");
const MEET_STATUS = require("../enums/meetStatus");

exports.getFeedbackOnPlatform = async (req, res) => {
    try {
        const { message, rating } = req.body;
        if (!message || !rating) {
            return res.status(400).send({
                message: "Message and rating is required",
                result: false,
            });
        }
        // rating should be between 1 and 5
        if ([1, 2, 3, 4, 5].indexOf(rating) === -1) {
            return res.status(400).send({
                message: "Rating should be between 1 and 5",
                result: false,
            });
        }
        // number of feedback send in past 24 hr must be less than 5
        const feedbacks = await FeedBack.find({
            user: req.user._id,
            createdAt: {
                $gte: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
        });
        if (feedbacks.length >= 5) {
            return res.status(400).send({
                message: "You have reached your daily limit of feedbacks.",
                result: false,
            });
        }
        const feedBack = await FeedBack.create({
            message,
            rating,
            user: req.user._id,
            toPlatform: true,
        });
        res.status(200).send({
            message: "Thank you for your valuable feedback",
            result: feedBack,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Error while getting feedbacks",
            error: error.message,
        });
    }
};

exports.giveFeedbackToMentorOnMeet = async (req, res) => {
    try {
        const { message, meetId, rating } = req.body;
        if (!meetId) {
            return res.status(400).send({
                message: "Invalid Request",
                result: false,
            });
        }
        if (!message || !rating) {
            return res.status(400).send({
                message: "Message and rating is required",
                result: false,
            });
        }
        const meet = await Meet.findById(meetId);
        if (!meet) {
            return res.status(400).send({
                message: "Invalid Request",
                result: false,
            });
        }
        if (meet.user.toString() !== req.user._id.toString()) {
            return res.status(400).send({
                message:
                    "You are not authorised to give feedback for this meet",
                result: false,
            });
        }
        if (meet.feedback) {
            return res.status(400).send({
                message: "Feedback already given for this meet",
                result: false,
            });
        }
        // meeet should be completed
        // TODO()

        const mentorId = meet.mentor;

        const mentorUser = await User.findById(mentorId);
        const mentor = await User.findById(mentorUser.user);

        const feedBack = await FeedBack.create({
            message,
            rating,
            user: req.user._id,
            meetId,
            mentorId,
        });
        meet.feedback = feedBack._id;
        mentor.feedbacks.push(feedBack._id);
        await mentor.save();
        await meet.save();

        res.status(200).send({
            message: `FeedBack sent to ${mentor.firstname} ${mentor.lastname}`,
            result: feedBack,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error while sending feedback",
            error: error.message,
            result: false,
        });
    }
};
