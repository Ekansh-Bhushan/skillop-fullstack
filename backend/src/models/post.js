const mongoose = require("mongoose");

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

module.exports = mongoose.model("posts", PostSchema);
