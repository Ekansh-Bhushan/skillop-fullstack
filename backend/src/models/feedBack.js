const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    meetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "meet",
        required: false,
    },
    mentorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    toPlatform: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports =  mongoose.model["feedBack"] || mongoose.model("feedBack", feedBackSchema);

