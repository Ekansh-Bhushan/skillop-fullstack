const mongoose = require("mongoose");

const mlEventHintsSchema = new mongoose.Schema({
    content: {
        type: String,
        default: ""
    },
    questionReference: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "MlEventQuestion", 
        required: [true, "Question reference is required"]
    }
});

module.exports = mongoose.model("MlEventHints", mlEventHintsSchema);
