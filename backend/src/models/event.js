const mongoose = require("mongoose");

const EventScheema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    registerBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        select: false,
    }],
    __createdAt: {
        type: Date,
        default: Date.now(),
    },
    __updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("events", EventScheema);