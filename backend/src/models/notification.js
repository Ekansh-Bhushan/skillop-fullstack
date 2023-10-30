const mongoose = require("mongoose");
const NotificationType = require("../enums/notificationType");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    __created: {
        type: Date,
        default: Date.now,
    },

    link: {
        type: String,
    },

    type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    read: {
        type: Boolean,
        default: false,
    },

    readDate: {
        type: Date,
    },

    fromUserProfileImg: {
        type: String,
    },
});


module.exports = mongoose.model("notifications", notificationSchema);