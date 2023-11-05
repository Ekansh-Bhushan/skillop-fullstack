const mongoose = require("mongoose");
const MEET_STATUS = require("../enums/meetStatus");

const MeetSchema = new mongoose.Schema({
    __created: {
        type: Date,
        default: Date.now,
    },
    day: {
        type: String,
        enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
        ],
        required: true,
    },
    s: {
        type: Number,
        required: true,
    },
    e: {
        type: Number,
        required: true,
    },
    paymentPic: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(MEET_STATUS),
        default: MEET_STATUS.PENDING,
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    mentee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedbacks",
    },
    meetLink: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model("meet", MeetSchema);
