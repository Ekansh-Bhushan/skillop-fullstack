const Hashtags = require("../models/hashtags");
const Post = require("../models/post");
const User = require("../models/user");
const { response_200, response_500 } = require("../utils/responseCode.utils");

exports.queryHashtags = async (req, res) => {
    try {
        const { hashtag } = req.params;
        console.log(hashtag, "hashtag");
        const hashtags = await Hashtags.find({
            hashtag: { $regex: hashtag, $options: "i" },
        });
        response_200(
            res,
            "Hashtags fetched successfully",
            hashtags.map((hashtag) => hashtag.hashtag)
        );
    } catch (error) {
        response_500(res, "Internal server error", error);
    }
};

exports.getPostWithHashtag = async (req, res) => {
    try {
        const { hashtag } = req.params;
        const hashtagObject = await Hashtags.findOne({ hashtag });
        if (!hashtagObject) {
            return response_200(res, "No post found", []);
        }

        const posts = hashtagObject.posts;
        // console.log(posts, "posts");
        const data = [];
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]).populate("author");
            // console.log(post.author);
            try {
                data.push({
                    title: post.title,
                    caption: post.caption,
                    imageUrls: post.imageUrls,
                    likes: post.likes.length,
                    comments: post.comments.length,
                    user: {
                        username: post.author.username,
                        firstname: post.author.firstname,
                        lastname: post.author.lastname,
                        profileUrl: post.author.profilePicUrl,
                    },
                });
            } catch (error) {
                // console.log(error, post[i]);
            }
        }

        response_200(res, "Posts fetched successfully", data);
    } catch (error) {
        response_500(res, "Internal server error", error);
    }
};

exports.getUserWithHashtag = async (req, res) => {
    try {
        const { hashtag } = req.params;
        const hashtagObject = await Hashtags.findOne({ hashtag });
        if (!hashtagObject) {
            return response_200(res, "No user found", []);
        }

        const users = hashtagObject.users;
        const data = [];
        for (let i = 0; i < users.length; i++) {
            const user = await User.findById(users[i]);
            data.push({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                profileUrl: user.profilePicUrl,
            });
        }

        response_200(res, "Users fetched successfully", data);
    } catch (error) {
        response_500(res, "Internal server error", error);
    }
};
