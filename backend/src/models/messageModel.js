const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model('Message', MessageSchema);
module.exports = MessageModel;
