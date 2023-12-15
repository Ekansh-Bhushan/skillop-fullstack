const mongoose = require("mongoose");
const User = require("./user");
const getHashTags = require("../utils/getHashTags");
const getUsername = require("../utils/getUsername");

const PostSchema = mongoose.Schema({
    __created: {
        type: Date,
        default: Date.now(),
    },
    __lastEdited: {
        type: Date,
        default: Date.now(),
    },
    deactivateComments: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,
    },
    hashtags: {
        type: [String],
    },
    mentions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    caption: {
        type: String,
    },
    imageUrls: [
        {
            type: String,
        },
    ],

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments",
        },
    ],
    views: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    impressions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

PostSchema.pre("save", async function (next) {
    this.hashtags = getHashTags(this.title);
    const mentionedUsers = getUsername(this.title);
    console.log(mentionedUsers, "mentionedUsers");
    const users = await User.find({ username: { $in: mentionedUsers } });
    this.mentions = users.map((user) => user._id);
    return next();
});

module.exports = mongoose.model("posts", PostSchema);
