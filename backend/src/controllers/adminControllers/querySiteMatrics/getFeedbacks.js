const Feedback = require("../../../models/feedBack");
const {
    response_200,
    response_500,
} = require("../../../utils/responseCode.utils");

exports.getFeedbacks = async (req, res) => {
    try {
        const feedBack = await Feedback.find({ toPlatform: true });
        response_200(res, "Feedbacks fetched successfully", feedBack);
    } catch (error) {
        response_500(res, "Error while fetching feedbacks", error);
    }
};
