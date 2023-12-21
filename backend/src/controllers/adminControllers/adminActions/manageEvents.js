const Event = require('../../../models/event');
const User = require('../../../models/user');
const { response_400, response_200, response_500 } = require('../../../utils/responseCode.utils');


// Add

exports.addAdminEvent = async (req, res) => {
    try {
        const { title, description, startTime, endTime, link, image, createdBy } = req.body;
        
        if (!title || !description || !startTime || !endTime || !link || !image || !createdBy) {
            response_400(res, "Please fill all the fields");
        }

        const user = await User.findOne({ username: createdBy });

        if (!user) {
            return response_400(res, "User not found");
        }

        if (startTime > endTime) {
            return response_400(res, "Start time cannot be greater than end time");
        }

        const event = await Event.create({
            title,
            description,
            startTime,
            endTime,
            link,
            image,
            createdBy: user._id,
        });

        response_200(res, "Event created successfully", event);
    } catch (error) {
        response_500(res, "Error while creating event", error);
    }
}



// Delete

exports.deleteAdminEvent = async (req, res) => {
    try {
        const { eventId } = req.params;

        if (!eventId) {
            return response_400(res, "Please provide event id");
        }

        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return response_400(res, "Event not found");
        }

        response_200(res, "Event deleted successfully", event);
    } catch (error) {
        response_500(res, "Error while deleting event", error);
    }
}


// get all make caregory completed goingon upcoming
exports.getAllAdminEvents = async (req, res) => {
    try {
        const { type } = req.query;
        console.log(type)

        let events = await Event.find({});  

        if (type === "completed") {
            events = events.filter((event) => {
                return new Date(event.endTime) < new Date();
            });
        } else if (type === "goingon") {
            events = events.filter((event) => {
                return new Date(event.startTime) < new Date() && new Date(event.endTime) > new Date();
            });
        } else if (type === "upcoming") {
            events = events.filter((event) => {
                return new Date(event.startTime) > new Date();
            });
        }

        response_200(res, "Events fetched successfully", events);
    } catch (error) {
        response_500(res, "Error while fetching events", error);
    }
}