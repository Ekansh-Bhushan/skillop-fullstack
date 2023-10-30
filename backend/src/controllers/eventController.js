const Event = require("../models/event");
const Mentor = require("../models/mentor");
const User = require("../models/user");
const Notification = require("../models/notification");
const NotificationType = require("../enums/notificationType");

exports.createEvent = async (req, res) => {
    try {
        console.log(req.user);
        if (
            !req.body.title ||
            !req.body.description ||
            !req.body.startTime ||
            !req.body.endTime
        ) {
            return res.status(400).send({
                result: false,
                message: "Please provide all the required fields",
                debug: req.body,
            });
        }

        // ensure startTime is in correct format
        const startTime = new Date(req.body.startTime);
        if (startTime == "Invalid Date") {
            return res.status(400).send({
                result: false,
                message: "Please provide startTime in correct format",
            });
        }
        // ensure endTime is in correct format
        const endTime = new Date(req.body.endTime);
        if (endTime == "Invalid Date") {
            return res.status(400).send({
                result: false,
                message: "Please provide endTime in correct format",
            });
        }
        // ensure startTime is before endTime
        if (startTime >= endTime) {
            return res.status(400).send({
                result: false,
                message: "Please provide startTime before endTime",
            });
        }

        const userId = req.user._id;
        console.log(userId);
        const mentor = await Mentor.findOne({ user: userId });
        console.log(mentor);

        const event = new Event({
            title: req.body.title,
            description: req.body.description,
            startTime: startTime,
            endTime: endTime,
            link: req.body.link,
            image: req.body.image,
            createdBy: userId,
        });

        // send notification to all the users who have followed this mentor
        const user = User.findById(userId);

        const notification = new Notification({
            message: `${user.firstname} ${user.lastname} has created a new event`,
            link: `/events/${event._id}`,
            type: NotificationType.EVENT,
            fromUserProfileImg: user.profileImg,
        });

        await notification.save();
        const followers = mentor.followers;
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById({ _id: followers[i] });
            //send the above notification
            follower.notifications.push(notification._id);
            await follower.save();
        }

        event.mentor = mentor._id;
        mentor.events.push(event._id);

        await mentor.save();
        await event.save();



        res.status(201).send({
            result: true,
            message: "Event created successfully",
            event,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getActiveEvents = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit | 5);
        const skip = parseInt(req.query.skip | 0);
        // get whose events whose endTime is greater than current time
        const events = await Event.find({
            endTime: { $gt: new Date() },
        })
            .sort({ startTime: 1 })
            .limit(limit)
            .skip(skip)
            .populate("createdBy user");

        res.status(200).send({
            result: events,
            message: "Events fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate(
            "createdBy user"
        );
        if (!event) {
            return res.status(404).send({
                result: false,
                message: "Event not found",
            });
        }
        res.status(200).send({
            result: event,
            message: "Event fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getEventsByUserId = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit | 5);
        const skip = parseInt(req.query.skip | 0);
        const events = await Event.find({ createdBy: req.params.id })
            .sort({ startTime: 1 })
            .limit(limit)
            .skip(skip);
        res.status(200).send({
            result: events,
            message: "Events fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = [
            "title",
            "description",
            "startTime",
            "endTime",
            "link",
            "image",
        ];
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );
        if (!isValidOperation) {
            return res.status(400).send({
                result: false,
                message: "Invalid updates!",
            });
        }
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send({
                result: false,
                message: "Event not found",
            });
        }
        updates.forEach((update) => (event[update] = req.body[update]));
        await event.save();
        res.status(200).send({
            result: event,
            message: "Event updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const user = req.user;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send({
                result: false,
                message: "Event not found",
            });
        }
        if (event.createdBy != user._id) {
            return res.status(401).send({
                result: false,
                message: "You are not authorized to delete this event",
            });
        }
        await event.remove();
        res.status(200).send({
            result: true,
            message: "Event deleted successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getRegisteredUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit | 5);
        const skip = parseInt(req.query.skip | 0);
        const event = await Event.findById(req.params.id)
            .populate({
                path: "registerBy",
                options: {
                    limit: limit,
                    skip: skip,
                },
            })
            .select("registerBy");
        if (!event) {
            return res.status(404).send({
                result: false,
                message: "Event not found",
            });
        }
        res.status(200).send({
            result: event.registerBy,
            message: "Registered users fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send({
                result: false,
                message: "Event not found",
            });
        }
        const userId = req.user._id;
        const user = User.findById(userId);
        if (event.registerBy.includes(user._id)) {
            return res.status(400).send({
                result: false,
                message: "You have already registered for this event",
            });
        }
        event.registerBy.push(userId);
        await event.save();

        // send notification to the just before event starts
        const notification = new Notification({
            message: `Event ${event.title} is about to start`,
            link: `/events/${event._id}`,
            type: NotificationType.EVENT,
            fromUserProfileImg: user.profileImg,
        });

        notification.__createdAt = event.startTime - 5 * 60 * 1000;
        await notification.save();
        user.notifications.push(notification._id);
        await user.save();

        res.status(200).send({
            result: true,
            message: "Registered successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.unregisterUser = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send({
                result: false,
                message: "Event not found",
            });
        }
        const user = req.user;
        if (!event.registerBy.includes(user._id)) {
            return res.status(400).send({
                result: false,
                message: "You have not registered for this event",
            });
        }
        event.registerBy = event.registerBy.filter(
            (userId) => userId != user._id
        );
        await event.save();
        res.status(200).send({
            result: true,
            message: "Unregistered successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

exports.getRegisteredEvents = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit | 5);
        const skip = parseInt(req.query.skip | 0);
        const user = req.user;
        const events = await Event.find({ registerBy: user._id })
            .sort({ startTime: 1 })
            .limit(limit)
            .skip(skip);

        res.status(200).send({
            result: events,
            message: "Registered events fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
