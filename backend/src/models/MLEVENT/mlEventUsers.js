const mongoose = require("mongoose");

const mlEventUserSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, "team name is required"],
    },
    teamLeaderEmail: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v); 
            },
            message: (email) => `${email.value} is not a valid email address!`,
        },
    },
    teamPassword: {
        type: String,
        required: true,
        select: false,
    },
    teamPoints: {
        type: Number,
        default: 0, 
    },
    teamFinishTime: {
        type: Date,
        default: null,
    },
    teamNumberOfHints: {
        type: Number,
        default: 5,
    },
    teamQuestionSolved: {
        type: Number,
        default: 0, // Initialize to zero
    },
    profilePicUrl: {
        type: String,
        default: "",
    }
});

module.exports = mongoose.model("MlEventUser", mlEventUserSchema);
