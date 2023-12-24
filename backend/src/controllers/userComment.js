const User = require("../models/user");
const Comment = require("../models/comment");
const Post = require("../models/post");
const Notification = require("../models/notification");
exports.addComment = async (req, res) => {
    try {
        const { comment } = req.body;
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send({
                result: false,
                message: "Post not found",
            });
        }
        // comment not possible in deactivated comments posts
        if (post.deactivateComments) {
            return res.status(400).send({
                result: false,
                message: "Comments are disabled for this post",
            });
        }
        const newComment = new Comment({
            user: req.user._id,
            post: postId,
            comment,
        });
        await newComment.save();

        // create notification to tell author about new comment
        const notification = new Notification({
            message: `${req.user.firstname} ${req.user.lastname} commented on your post`,
            type: "comment",
            link: `/post/${postId}`,
            fromUserProfileImg: req.user.profilePicUrl,
        });
        await notification.save();

        // add notification to post author
        const author = await User.findById(post.author);
        // check if the author is not the same as the user commenting
        if (author._id.toString() !== req.user._id.toString()) {
            author.notifications.push(notification._id);
            await author.save();
        }

        post.comments.push(newComment._id);
        await post.save();

        res.status(200).send({
            result: true,
            message: "Comment added",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.getComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        if (!postId) {
            return res.status(400).send({
                result: false,
                message: "Post id is required",
            });
        }
        // get post and populate the replies and the user
        const post = await Post.findById(postId)
            .populate({
                path: "comments",
                populate: {
                    path: "user",
                    select: "username firstname lastname profilePicUrl",
                },
            })
            .populate({
                path: "comments",
                populate: {
                    path: "replies",
                    populate: {
                        path: "user",
                        select: "username firstname lastname profilePicUrl",
                    },
                },
            });

        if (!post) {
            return res.status(404).send({
                result: false,
                message: "Post not found",
            });
        }
        res.status(200).send({
            result: post.comments,
            message: "success",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "internal server error",
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        if (!req.params.commentId) {
            return res.status(400).send({
                result: false,
                message: "Comment id is required",
            });
        }

        const comment = await Comment.findById(req.params.commentId).populate(
            "post"
        );

        if (!comment) {
            return res.status(404).send({
                result: false,
                message: "This comment does not exist",
            });
        }

        // the post author can delete any comment on his/ her post
        // console.log(comment.post, req.user._id.toString(), comment.user.toString(), req.user._id.toString());
        if (
            comment.post.author.toString() === req.user._id.toString() ||
            comment.user.toString() === req.user._id.toString()
        ) {
            // remove comment from post
            const post = await Post.findById(comment.post._id);
            post.comments = post.comments.filter(
                (c) => c.toString() !== comment._id.toString()
            );
            await post.save();

            await comment.deleteOne({ _id: comment._id });
            return res.status(200).send({
                result: true,
                message: "Comment deleted",
            });
        }

        return res.status(401).send({
            result: false,
            message: "Unauthorized",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) {
            return res.status(400).send({
                result: false,
                message: "Comment id is required",
            });
        }
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({
                result: false,
                message: "Comment not found",
            });
        }
        // check if the user has already liked the comment
        const isLiked = comment.likes.includes(req.user._id);
        if (isLiked) {
            // remove like
            comment.likes = comment.likes.filter(
                (id) => id.toString() !== req.user._id.toString()
            );
            await comment.save();
            return res.status(200).send({
                result: true,
                message: "Like removed",
            });
        }
        // add like
        comment.likes.push(req.user._id);
        await comment.save();
        return res.status(200).send({
            result: true,
            message: "Comment liked",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};

exports.replyComment = async (req, res) => {
    // only reply can be done to level 0 comments
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        if (!commentId) {
            return res.status(400).send({
                result: false,
                message: "Comment id is required",
            });
        }
        if (!comment) {
            return res.status(400).send({
                result: false,
                message: "Comment is required",
            });
        }
        const parentComment = await Comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).send({
                result: false,
                message: "Comment not found",
            });
        }
        if (parentComment.level !== 0) {
            return res.status(400).send({
                result: false,
                message: "Reply can be done to level 0 comments only",
            });
        }
        const newComment = new Comment({
            user: req.user._id,
            post: parentComment.post,
            comment,
            parent: parentComment._id,
            level: 1,
        });
        await newComment.save();

        // create notification to tell author about new comment
        const notification = new Notification({
            message: `${req.user.firstname} ${req.user.lastname} replied to your comment`,
            type: "comment",
            link: `/post/${parentComment.post}`,
            fromUserProfileImg: req.user.profilePicUrl,
        });
        await notification.save();

        // add notification to post author
        const author = await User.findById(parentComment.user);
        // check if the author is not the same as the user commenting
        if (author._id.toString() !== req.user._id.toString()) {
            author.notifications.push(notification._id);
            await author.save();
        }

        parentComment.replies.push(newComment._id);
        await parentComment.save();

        res.status(200).send({
            result: true,
            message: "Comment added",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
        });
    }
};
