const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    __created: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    },
    comment: {
        type: String,
        required: [true, "Comment is required"]
    }
})

module.exports = mongoose.model('comments', CommentSchema);