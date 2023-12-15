const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Notification = require("../models/notification");
const NotificationType = require("../enums/notificationType");
const path = require("path");
const getHashTags = require("../utils/getHashTags");
const getUsername = require("../utils/getUsername");
const { response } = require("express");
const {
    response_500,
    response_200,
    response_400,
} = require("../utils/responseCode.utils");
exports.createPost = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.title) {
            return res.status(400).send({
                result: false,
                message: "title is required",
            });
        }
        const newPostData = {
            title: req.body.title,
            caption: req.body.caption ? req.body.caption : "",
            // imageUrl: "req.body.imageUrl",
            author: req.user._id,
        };
        // console.log(req.files)
        if (req.files && req.files.length > 0)
            newPostData.imageUrls = req.files.map(
                (file) =>
                    process.env.BASE_URL +
                    "/api/public/posts/" +
                    req.user._id.toString() +
                    "/" +
                    file.filename
            );
        newPostData.__created = Date.now();

        // if(req.file.fieldname == "imageUrl") newPostData.imageUrl = req.file.filename;

        // For storing hashtags and mentions
        // newPostData.hashtags = getHashTags(newPostData.title);
        // usernames = getUsername(newPostData.title);
        // const mentionedUsers = await User.find({ username: usernames });
        // newPostData.mentions = mentionedUsers.map((user) => user._id);

        const newPost = new Post(newPostData);
        console.log(newPost);
        newPost.save();
        const user = await User.findById({ _id: req.user._id });
        // console.log(user);
        user.posts.push(newPost._id);
        user.save();

        // create a notification
        const notification = new Notification({
            message: `${user.firstname} ${user.lastname} has posted a new post`,
            link: `/post/${newPost._id}`,
            type: NotificationType.POST,
            fromUserProfileImg: user.profilePicUrl,
        });
        await notification.save();

        //send notification of this post to all of his followes
        const followers = user.followers;
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById({ _id: followers[i] });
            //send the above notification
            if (follower._id.toString() === user._id.toString()) continue;
            follower.notifications.push(notification._id);
            await follower.save();
        }

        res.status(201).send({
            result: newPost,
            message: "Post created successfully",
        });
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
            message: "Internal server error",
        });
    }
};

exports.disableComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({
                result: false,
                err: "Post not found",
                message: "Post not found",
            });
        }
        if (post.author.toString() !== userId.toString()) {
            return res.status(401).send({
                result: false,
                err: "Unauthorized",
                message: "Can't deactivate comments of others post",
            });
        }
        post.deactivateComments = !post.deactivateComments;
        await post.save();

        res.status(200).send({
            result: true,
            message: `Comments ${
                post.deactivateComments ? "deactivated" : "activated"
            } successfully`,
        });
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        // console.log(postId)
        const userId = req.user._id;
        const post = await Post.findOne({ _id: postId });
        console.log(post);
        if (!post) {
            return res.status(404).send({
                result: false,
                err: "Post not found",
                message: "Post not found",
            });
        }
        if (post.author.toString() !== userId.toString()) {
            return res.status(401).send({
                result: false,
                err: "Unauthorized",
                message: "Can't delete others post",
            });
        }

        //DELETE LIKES ON POST
        const likes = post.likes;
        for (let i = 0; i < likes.length; i++) {
            const user = await User.findOne({ _id: likes[i] });
            const index = user.postLiked.indexOf(postId);
            user.postLiked.splice(index, 1);
            await user.save();
        }

        //DELETE VIEWS ON POST
        const views = post.views;
        for (let i = 0; i < views.length; i++) {
            const user = await User.findOne({ _id: views[i] });
            const index = user.postViewed.indexOf(postId);
            user.postViewed.splice(index, 1);
            await user.save();
        }

        //DELETE COMMENTS ON POST
        const comments = post.comments;

        for (let i = 0; i < comments.length; i++) {
            await Comment.deleteOne({ _id: comments[i] });
        }

        const user = await User.findOne({ _id: userId });
        const index = user.posts.indexOf(postId);
        user.posts.splice(index, 1);
        await user.save();

        await Post.deleteOne({ _id: postId });

        res.status(200).send({
            result: true,
            message: "Post deleted successfully",
        });
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};

exports.likeAndUnlikePost = async (req, res) => {
    console.log("Xcvbn");
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        const user = await User.findById({ _id: userId });
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({
                result: false,
                err: "Post not found",
            });
        }
        const isLiked = post.likes.includes(userId);
        if (isLiked) {
            const index = post.likes.indexOf(userId);
            post.likes.splice(index, 1);
            // remove post fom user likes
            const userIndex = user.postLiked.indexOf(postId);
            user.postLiked.splice(userIndex, 1);
            await user.save();
            await post.save();
            return res.status(200).send({
                result: true,
                message: "Post unliked successfully",
            });
        }
        post.likes.push(userId);
        // add the post to user liked posts

        user.postLiked.push(postId);
        await user.save();
        await post.save();

        // create a notification
        const notification = new Notification({
            message: `${req.user.firstname} ${req.user.lastname} has liked your post`,
            link: `/post/${post._id}`,
            type: NotificationType.POST,
            fromUserProfileImg: req.user.profilePicUrl,
        });
        await notification.save();

        // send this notification to this post author
        const author = await User.findById({ _id: post.author });
        // check if the author is not the same as the user liking
        if (author._id.toString() !== req.user._id.toString()) {
            author.notifications.push(notification._id);
            await author.save();
        }

        res.status(200).send({
            result: true,
            message: "Post liked successfully",
        });
    } catch (err) {
        res.status(500).send({
            result: false,
            err: err.message,
        });
    }
};

exports.getWhoLikedPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(400).send({
                result: false,
                message: "Post id is required",
            });
        }
        // populate likes array with firstname, lastname, profilePicUrl
        const post = await Post.findById(postId).populate({
            path: "likes",
            select: "firstname lastname profilePicUrl",
        });

        if (!post) {
            return res.status(404).send({
                result: false,
                message: "Post not found",
            });
        }

        res.status(200).send({
            result: post.likes,
            message: "success",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.getPostsFromFollowings = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const post = await Post.find({ author: { $in: user.followings } });
        // and the user to the impression array of the post
        // for (let i = 0; i < post.length; i++) {
        //     //check if user already exist
        //     if (post[i].impressions.includes(req.user._id)) continue;
        //     post[i].impressions.push(req.user._id);
        //     await post[i].save();
        // }
        res.status(200).send({
            result: post,
            message: "Posts fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.getPostsFromUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({
                result: false,
                err: "User not found",
                message: "User not found",
            });
        }
        const post = await Post.find({ author: req.params.userId }).populate(
            "author comments"
        );
        // and the user to the impression array of the post
        // for (let i = 0; i < post.length; i++) {
        //     //check if user already exist
        //     if (post[i].impressions.includes(req.user._id)) continue;
        //     post[i].impressions.push(req.user._id);
        //     await post[i].save();
        // }
        res.status(200).send({
            result: post,
            message: "Posts fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.getPosts = async (req, res) => {
    try {
        let post = await Post.findById(req.params.postId).populate(
            "author comments"
        );

        // add user to views and impression if not already present
        // if (!post.impressions.includes(req.user._id)) {
        //     post.impressions.push(req.user._id);
        //     await post.save();
        // }

        if (!post) {
            return res.status(404).send({
                result: false,
                err: "Post not found",
                message: "Post not found",
            });
        }
        // if (!post.views || !post.views.includes(req.user._id)) {
        //     post.views.push(req.user._id);
        //     await post.save();
        // }
        if (post.deactivateComments) {
            // remove comments artribute from post
            post.comments = undefined;
        }

        res.status(200).send({
            result: post,
            message: "Post fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.getPostsFromAll = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit | "10");
        const skip = parseInt(req.query.skip | "0");
        console.log(limit, skip);
        // query the post and populate the author and comments and sort by date created and show latest first
        const post = await Post.find()
            .populate("author comments")
            .sort({ __created: -1 })
            .limit(limit)
            .skip(skip);
        res.status(200).send({
            result: post,
            message: "Posts fetched successfully",
            length: post.length,
            skip: skip,
            limit: limit,
            totalPost: await Post.countDocuments(),
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        // console.log(req.body)
        if (!post) {
            return res.status(404).send({
                result: false,
                err: "Post not found",
                message: "Post not found",
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(401).send({
                result: false,
                err: "Unauthorized",
                message: "Can't update others post",
            });
        }
        // console.log(req.body.title)
        let update = new Object(); // TODO() Image implementation
        if (req.body.title) update.title = req.body.title;
        if (req.body.caption) update.caption = req.body.caption;
        if (req.body.title || update.req.body.caption)
            __lastEdited = Date.now();

        if (req.files && req.files.length > 0)
            update.imageUrls = req.files.map(
                (file) =>
                    process.env.BASE_URL +
                    "/api/public/posts/" +
                    req.user._id.toString() +
                    "/" +
                    file.filename
            );
        console.log(update);

        await Post.updateOne({ _id: req.params.postId }, update);

        res.status(200).send({
            result: true,
            message: "Post updated successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.getPostsFromHashtag = async (req, res) => {
    try {
        const hashtag = req.params.hashtag;
        if (!hashtag) return response_400(res, "Hashtag is required");
        const post = await Post.find({ hashtags: hashtag });
        response_200(res, "Posts fetched successfully", post);
    } catch (error) {
        response_500(res, "Internal server error", error);
    }
};
