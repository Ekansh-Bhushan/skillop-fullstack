const mongoose = require("mongoose");

const mlEventQuestionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    questionVideoURL: {
        type: String,
        default: null,
    },
    questionPhotoURL: {
        type: String,
        default: null,
    },
    questionAudioURL: {
        type: String,
        default: null,
    },
    questionHints: {
        type: String,
        required: [true, "Hints are required"],
        default: "",
    },
    points: {
        type: Number,
        required: [true, "Points are required"],
    }
});

module.exports = mongoose.model("MlEventQuestion", mlEventQuestionSchema);
