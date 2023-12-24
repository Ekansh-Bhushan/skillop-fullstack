const mongoose = require("mongoose");
const Post = require("./post");
const getHashTags = require("../utils/getHashTags");
const Hashtag = require("./hashtags");

const CommentSchema = new mongoose.Schema({
    __created: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments",
        },
    ],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        default: null,
    },
    level: {
        type: Number,
        default: 0,
    },
});

CommentSchema.pre("save", async function (next) {
    const post = await Post.findById(this.post);
    const hashtags = getHashTags(this.comment)

    for (let i = 0; i < hashtags.length; i++) {
        const hashtag = await Hashtag.findOne({ hashtag: hashtags[i] });
        if (hashtag) {
            hashtag.addPost(post);
        } else {
            const newHashtag = new Hashtag({ hashtag: hashtags[i] });
            await newHashtag.save();
            newHashtag.addPost(post);
        }
    }
    next();
});

module.exports = mongoose.model("comments", CommentSchema);
