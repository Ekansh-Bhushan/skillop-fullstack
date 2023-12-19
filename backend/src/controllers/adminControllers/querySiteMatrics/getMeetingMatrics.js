// MEETING LIST WITH MENTOR MENTEE DATA AND MEETING LINK

const Meet = require("../../../models/meet");

const {
    response_200,
    response_500,
} = require("../../../utils/responseCode.utils");

exports.getMeetingMatrics = async (req, res) => {
    try {
        const meetings = await Meet.find().populate("mentor");
        response_200(res, "Meetings fetched successfully", meetings);
    } catch (error) {
        response_500(res, "Error while fetching meetings", error);
    }
};
