// DEAD USER LIST - NO LOGIN FROM 30+ DAYS
// logic:__lastVistird - now >30days

const User = require("../../../models/user");
const Comment = require("../../../models/comment");
const {
    response_200,
    response_500,
} = require("../../../utils/responseCode.utils");

exports.getDeadUser = async (req, res) => {
    try {
        // find user with last visited 30+ days ago
        const days = parseInt(req.query.days || "30");
        const users = await User.find({
            __lastVisited: {
                $lt: Date.now() - days * 24 * 60 * 60 * 1000,
            },
        });
        return response_200(res, "Dead users fetched successfully", users);
    } catch (error) {
        response_500(res, "Error while fetching mentors", error);
    }
};

// COMPLETE USER LIST WITH DAILY NEW ADDED USER ( WITH CONTACT , EMAIL AND UPI DATA)

exports.getNewSignUp = async (req, res) => {
    try {
        const days = parseInt(req.query.days || "1");
        const users = await User.find({
            __created: {
                $gt: Date.now() - days * 24 * 60 * 60 * 1000,
            },
        });
        return response_200(res, "New users fetched successfully", users);
    } catch (error) {
        response_500(res, "Error while fetching mentors", error);
    }
};

// MOST FOLLOWED USERS LIST

exports.getMostFollowedUser = async (req, res) => {
    try {
        const GET_TOP_OF = req.query.getTopOf || 10;
        let users = await User.find({});
        users.sort((a, b) => b.followers.length - a.followers.length);
        users = users.slice(0, GET_TOP_OF);
        return response_200(
            res,
            "Most followed users fetched successfully",
            users
        );
    } catch (error) {
        response_500(res, "Error while fetching mentors", error);
    }
};

// MOST ACTIVE USERS LIST ( POSTS
// COMMENTS)

exports.getMostActiveUser = async (req, res) => {
    try {
        const GET_TOP_OF = req.query.getTopOf || 10;
        const POST_COMMENT_RATIO = req.query.postCommentRatio || 1;
        let users = await User.find({});

        const peoples = {};
        for (let user of users) {
            if (user.posts) user.__totalPosts = user.posts.length;
            else user.__totalPosts = 0;

            const commentByUser = await Comment.find({ user: user._id });
            user.__totalComments = commentByUser.length;
        }

        users.sort(
            (a, b) =>
                b.__totalPosts * POST_COMMENT_RATIO +
                b.__totalComments -
                (a.__totalPosts * POST_COMMENT_RATIO + a.__totalComments)
        );
        users = users.slice(0, GET_TOP_OF).map((user) => {
            return {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                __totalPosts: user.__totalPosts,
                __totalComments: user.__totalComments,
                profilePicUrl: user.profilePicUrl,
            };
        });

        return response_200(
            res,
            "Most active users fetched successfully",
            users
        );
    } catch (error) {
        response_500(res, "Error while fetching mentors", error);
    }
};
