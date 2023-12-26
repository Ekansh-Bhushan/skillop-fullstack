const User = require("../../../models/user");
const Comment = require("../../../models/comment");
const Post = require("../../../models/post");
const Mentor = require("../../../models/mentor");
const FeedBack = require("../../../models/feedBack");
const Meet = require("../../../models/meet");
const {
    response_200,
    response_500,
} = require("../../../utils/responseCode.utils");
const MEET_STATUS = require("../../../enums/meetStatus");

exports.getSiteMatrics = async (req, res) => {
    try {
        const users = await User.find({});
        const mentors = await Mentor.find({});
        const posts = await Post.find({});
        const comments = await Comment.find({});
        const feedbacks = await FeedBack.find({});
        const numberOfLikes = posts.reduce((acc, post) => {
            return acc + post.likes.length;
        }, 0);
        const meets = await Meet.find({ status: MEET_STATUS.ACCEPTED });
        const data = {
            users: users.length,
            mentors: mentors.length,
            posts: posts.length,
            comments: comments.length,
            feedbacks: feedbacks.length,
            numberOfLikes,
            meets: meets.length,
        };
        return response_200(res, "Site matrics fetched successfully", data);
    } catch (error) {
        response_500(res, "Error while fetching site matrics", error);
    }
};
