const User = require("../models/user");
const Meet = require("../models/meet");
const Mentor = require("../models/mentor");
const MEET_STATUS = require("../enums/meetStatus");
const { getDate } = require("../utils/buildDate");
exports.getMeets = async (req, res) => {
    try {
        // get user meet request sent
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send({
                result: false,
                message: "User not found",
            });
        }
        if (!user.meetScheduled) {
            user.meetScheduled = "{}";
        }
        meetScheduled = JSON.parse(user.meetScheduled);

        // populate the meet and mentor details
        const meets = {};
        for (let date of Object.keys(meetScheduled)) {
            meets[date] = [];
            console.log(Object.keys(meetScheduled), date);
            for (let i = 0; i < meetScheduled[date].length; i++) {
                const meetId = meetScheduled[date][i];
                const meet = await Meet.findById(meetId).populate("mentor", [
                    "firstname",
                    "lastname",
                    "profilePicUrl",
                ]);
                meets[date].push(meet);
            }
            if (meets[date].length === 0) {
                delete meets[date];
            }
        }

        // console.log(meets);

        // send the meet request
        res.status(200).send({
            message: "success",
            result: meets,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getAcceptedMeet = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.meetScheduled) {
            user.meetScheduled = "{}";
        }
        meetScheduled = JSON.parse(user.meetScheduled);
        const acceptedMeets = {};
        for (let date of Object.keys(meetScheduled)) {
            acceptedMeets[date] = [];
            for (let i = 0; i < meetScheduled[date].length; i++) {
                const meetId = meetScheduled[date][i];
                const meet = await Meet.findById(meetId).populate("mentor", [
                    "firstname",
                    "lastname",
                    "profilePicUrl",
                ]);
                const startDate = getDate(meet.date, meet.e);
                if (meet.status === MEET_STATUS.ACCEPTED && startDate > Date.now()) {
                    acceptedMeets[date].push(meet);
                }
            }
            if (acceptedMeets[date].length === 0) {
                delete acceptedMeets[date];
            }
        }
        res.status(200).send({
            result: acceptedMeets,
            message: "success",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getPendingMeets = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.meetScheduled) {
            user.meetScheduled = "{}";
        }
        meetScheduled = JSON.parse(user.meetScheduled);
        const pendingMeets = {};
        for (let date of Object.keys(meetScheduled)) {
            pendingMeets[date] = [];
            for (let i = 0; i < meetScheduled[date].length; i++) {
                const meetId = meetScheduled[date][i];
                const meet = await Meet.findById(meetId).populate("mentor", [
                    "firstname",
                    "lastname",
                    "profilePicUrl",
                ]);
                const startDate = getDate(meet.date, meet.s);
                if (meet.status === MEET_STATUS.PENDING && startDate > Date.now()) {
                    pendingMeets[date].push(meet);
                }
            }
            if (pendingMeets[date].length === 0) {
                delete pendingMeets[date];
            }
        }

        res.status(200).send({
            result: pendingMeets,
            message: "success",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getRejectedMeets = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.meetScheduled) {
            user.meetScheduled = "{}";
        }
        meetScheduled = JSON.parse(user.meetScheduled);
        const rejectedMeets = {};
        for (let date of Object.keys(meetScheduled)) {
            rejectedMeets[date] = [];
            for (let i = 0; i < meetScheduled[date].length; i++) {
                const meetId = meetScheduled[date][i];
                const meet = await Meet.findById(meetId).populate("mentor", [
                    "firstname",
                    "lastname",
                    "profilePicUrl",
                ]);
                
                if (meet.status === MEET_STATUS.REJECTED) {
                    rejectedMeets[date].push(meet);
                }
            }
            if (rejectedMeets[date].length === 0) {
                delete rejectedMeets[date];
            }
        }

        res.status(200).send({
            result: rejectedMeets,
            message: "success",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getCompletedMeet = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.meetScheduled) {
            user.meetScheduled = "{}";
        }
        meetScheduled = JSON.parse(user.meetScheduled);
        const completedMeets = {};
        for (let date of Object.keys(meetScheduled)) {
            completedMeets[date] = [];
            for (let i = 0; i < meetScheduled[date].length; i++) {
                const meetId = meetScheduled[date][i];
                const meet = await Meet.findById(meetId).populate("mentor", [
                    "firstname",
                    "lastname",
                    "profilePicUrl",
                ]);
                // create a date object using the meet.e of the form 700 for 7:00AM and meet.date for the date
                
                const endDate = getDate(meet.date, meet.e);
                if (meet.status === MEET_STATUS.ACCEPTED && endDate < Date.now()) {
                    completedMeets[date].push(meet);
                }
            }
            if (completedMeets[date].length === 0) {
                delete completedMeets[date];
            }
        }

        res.status(200).send({
            result: completedMeets,
            message: "success",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
