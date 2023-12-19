const mongoose = require("mongoose");

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
    replys: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments",
        },
    ],
    level: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("comments", CommentSchema);
