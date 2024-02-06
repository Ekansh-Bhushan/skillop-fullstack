// MENTOR LIST WITH NUMBER OF MEETING AND NUMBER OF SLOTS AND FEES

const User = require("../../../models/user");
const Mentor = require("../../../models/mentor");
const Meet = require("../../../models/meet");

const {
    response_200,
    response_500,
} = require("../../../utils/responseCode.utils");
const MEET_STATUS = require("../../../enums/meetStatus");

exports.getMentorMatrics = async (req, res) => {
    try {
        const mentors = await Mentor.find({}).populate("user");
        // console.log(mentors)
        const days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ];
        const data = [];
        for (const mentor of mentors) {
            let numberOfMeetingsAccepted = 0;
            let numberOfMeetings = 0;
            let numberOfSlots = 0;
            let fees = mentor.chargePerHour;
            if (!mentor.actualAvailability) mentor.actualAvailability = {};
            days.forEach((day) => {
                numberOfSlots += mentor.actualAvailability[day].length;
            });
            if (!mentor.meetRequests) mentor.meetRequests = "{}";
            const meetRequests = JSON.parse(mentor.meetRequests);
            for (const key of Object.keys(meetRequests)) {
                for (let meet of meetRequests[key]) {
                    meet = await Meet.findById(meet);
                    if (meet.status === MEET_STATUS.ACCEPTED)
                        numberOfMeetingsAccepted++;
                    numberOfMeetings++;
                }
            }
            console.log(mentor)
            try {
                data.push({
                    mentorId: mentor._id,
                    userId: mentor.user._id,
                    firstname: mentor.user.firstname,
                    lastname: mentor.user.lastname,
                    profilePicUrl: mentor.user.profilePicUrl,
                    numberOfMeetingsAccepted,
                    numberOfMeetings,
                    numberOfSlots,
                    fees,
                });
            } catch (error) {
                // console.log(error);
            }
        }
        response_200(res, "Mentors fetched successfully", data);
    } catch (error) {
        response_500(res, "Error while fetching mentors", error);
    }
};

// HIGHEST EARNER LIST

exports.getHighestEarner = async (req, res) => {
    try {
        const mentors = await Mentor.find({}).populate("user");
        
        const days = [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ];
        const data = [];

        for (const mentor of mentors) {
            let numberOfMeetingsAccepted = 0;
            let numberOfMeetings = 0;
            let numberOfSlots = 0;
            let fees = mentor.chargePerHour;
            if (!mentor.actualAvailability) mentor.actualAvailability = {};
            days.forEach((day) => {
                numberOfSlots += mentor.actualAvailability[day].length;
            });
            if (!mentor.meetRequests) mentor.meetRequests = "{}";
            const meetRequests = JSON.parse(mentor.meetRequests);
            for (const key of Object.keys(meetRequests)) {
                for (let meet of meetRequests[key]) {
                    meet = await Meet.findById(meet);
                    if (meet.status === MEET_STATUS.ACCEPTED)
                        numberOfMeetingsAccepted++;
                    numberOfMeetings++;
                }
            }
            try {
                data.push({
                    mentorId: mentor._id,
                    userId: mentor.user._id,
                    firstname: mentor.user.firstname,
                    lastname: mentor.user.lastname,
                    profilePicUrl: mentor.user.profilePicUrl,
                    numberOfMeetingsAccepted,
                    numberOfMeetings,
                    numberOfSlots,
                    fees,
                });
            } catch (error) {
                // console.log(error);
            }
        }
        data.sort((a, b) => {
            return b.numberOfMeetingsAccepted * b.fees -
                a.numberOfMeetingsAccepted * a.fees;
        });
        response_200(res, "Mentors fetched successfully", data);
    } catch (error) {
        response_500(res, "Error while fetching mentors", error);
    }
};
