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
        const data = [];
        const seenPosts = new Set();  // To track unique posts

        // Iterate through each post ID associated with the hashtag
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]).populate("author");

            // Check if the post ID is already in seenPosts
            if (!seenPosts.has(post._id.toString())) {
                seenPosts.add(post._id.toString());  // Add the post ID to seenPosts
                console.log('Adding post ID:', post._id.toString()); // Logging added post ID

                // Construct the post object to be returned
                data.push({
                    title: post.title,
                    
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
            } else {
                console.log('Duplicate post ID:', post._id.toString()); // Logging duplicate post ID
            }
        }

        console.log('Unique posts:', data); // Logging unique posts
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
        const seenPosts = new Set();  // To track unique posts
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
