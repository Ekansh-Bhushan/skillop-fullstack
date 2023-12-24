const mongoose = require("mongoose");
const User = require("./user");
const getHashTags = require("../utils/getHashTags");
const getUsername = require("../utils/getUsername");
const Hashtags = require("./hashtags");

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
    for (let i = 0; i < this.hashtags.length; i++) {
        const hashtag = await Hashtags.findOne({ hashtag: this.hashtags[i] });
        if (hashtag) {
            hashtag.posts.push(this._id);
            await hashtag.save();
        } else {
            const newHashtag = new Hashtags({
                hashtag: this.hashtags[i],
                posts: [this._id],
            });
            await newHashtag.save();
        }
    }
    const mentionedUsers = getUsername(this.title);
    console.log(mentionedUsers, "mentionedUsers");
    const users = await User.find({ username: { $in: mentionedUsers } });
    this.mentions = users.map((user) => user._id);
    return next();
});

module.exports = mongoose.model("posts", PostSchema);
