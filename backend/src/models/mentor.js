const mongoose = require("mongoose");

const slot = new mongoose.Schema({
    date: String,
    slotItems: [{ s: Number, e: Number }],
});

const MentorSchema = new mongoose.Schema({
    __created: {
        type: Date,
        default: Date.now(),
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    actualAvailability: {
        type: {
            monday: [{ s: Number, e: Number }],
            tuesday: [{ s: Number, e: Number }],
            wednesday: [{ s: Number, e: Number }],
            thursday: [{ s: Number, e: Number }],
            friday: [{ s: Number, e: Number }],
            saturday: [{ s: Number, e: Number }],
            sunday: [{ s: Number, e: Number }],
        },
    },

    meetRequests: String,
    feedbacks: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "feedbacks",
            },
        ],
        select: false,
        default: [],
    },

    // currentAvailability: {
    //     type: Map,
    //     of: [{ s: Number, e: Number }],
    // },
    currentAvailability: String,

    chargePerHour: { type: Number, default: 300 },

    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "events",
        },
    ],
});

module.exports = mongoose.model("mentors", MentorSchema);
