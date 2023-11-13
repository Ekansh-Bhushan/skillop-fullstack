const User = require("../../models/user");
const Mentor = require("../../models/mentor");
const Notification = require("../../models/notification");
const NotificationType = require("../../enums/notificationType");
const {
    eligibleToBecomeMentor,
} = require("../../validators/mentorEligibility");
const { MENTOR_STATUS } = require("../../enums/mentorStatus");

exports.makeMentor = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                result: false,
                err: "User not found",
            });
        }
        if (user.isMentor || user.mentor) {
            return res.status(403).send({
                result: false,
                err: "Forbidden: User is already a mentor",
            });
        }
        // check if user appied to be a mentor
        if (user.becomingMentorStatus != MENTOR_STATUS.PENDING) {
            return res.status(403).send({
                result: false,
                err: "Forbidden: User did not apply to be a mentor",
            });
        }

        const userProfileCompletion = eligibleToBecomeMentor(user);
        if (userProfileCompletion.percentageProfileComplete < 100) {
            return res.status(403).send({
                result: false,
                err: "Forbidden: User profile is not complete",
                message: `User profile is ${userProfileCompletion.percentageProfileComplete}% complete. User needs to complete the profile to be a mentor`,
            });
        }

        const newMentor = new Mentor({
            user: userId,
        });

        user.isMentor = true;
        user.mentor = newMentor._id;

        // SEND notification to user that his/her mentor request is accepted
        const notification = new Notification({
            user: user._id,
            type: NotificationType.MENTOR_REQUEST_ACCEPTED,
            message: `${user.firstname} ${user.lastname} your request to be a mentor is accepted`,
        });
        await notification.save();
        user.notifications.push(notification._id);
        await newMentor.save();
        await user.save();

        res.status(200).send({
            result: true,
            message: `${user.firstname} ${user.lastname} is now a mentor`,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.getApplicantsForMentor = async (req, res) => {
    try {
        const applicants = await User.find({
            becomingMentorStatus: MENTOR_STATUS.PENDING,
            isMentor: false,
            mentor: null,
        }).select("firstname lastname email profilePicture");

        res.status(200).send({
            result: true,
            applicants,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.getELegibleApplicantsForMentor = async (req, res) => {
    try {
        const applicants = await User.find().select(
            "firstname lastname email profilePicture"
        );

        const eligibleApplicants = applicants.filter((applicant) => {
            const userProfileCompletion = eligibleToBecomeMentor(applicant);
            return (
                userProfileCompletion.percentageProfileComplete >= 100 &&
                !applicant.isMentor &&
                !applicant.mentor &&
                applicant.becomingMentorStatus == MENTOR_STATUS.NOT_APPLIED
            );
        });

        res.status(200).send({
            result: true,
            applicants: eligibleApplicants,
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
