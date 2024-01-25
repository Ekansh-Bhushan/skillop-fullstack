// const MessageModel = require("../models/messageModel");
// const User = require("../models/user");

// exports.addMessage = async (req, res) => {
//   const { chatId, senderId, text } = req.body;
//   if (!chatId || !senderId || !text) {
//     return res.status(400).send({
//       result: false,
//       message: "chatId, senderId and text are required",
//     });
//   }
//   // check validity of sender and receiver id
//   const senderUser = await User.findById(senderId);
//   if (!senderUser) {
//     return res.status(400).send({
//       result: false,
//       message: "senderId is not correct",
//     });
//   }
//   const receiverUser = await User.findById(receiverId);
//   if (!receiverUser) {
//     return res.status(400).send({
//       result: false,
//       message: "receiverId is not correct",
//     });
//   }
//   const message = new MessageModel({
//     chatId,
//     senderId,
//     text,
//   });
//   try {
//     const result = await message.save();
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send({
//       result: false,
//       message: "Error while getting messages",
//       error,
//     });
//   }
// };

// exports.getMessages = async (req, res) => {
//   const { chatId } = req.params;
//   if (!chatId) {
//     return res.status(400).send({
//       result: false,
//       message: "chatId is required",
//     });
//   }

//   try {
//     const result = await MessageModel.find({ chatId });
//     // check validity of result
//     if (!result) {
//       return res.status(400).send({
//         result: false,
//         message: "chatId is not correct",
//       });
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).send({
//       result: false,
//       message: "Error while getting messages",
//       error,
//     });
//   }
// };

const MessageModel = require('../models/messageModel');

exports.addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.seenMessage = async (req, res) => {
  const msgID = req.params.msgID;
  try {
    const reqMsg = await MessageModel.findByIdAndUpdate(
      msgID,
      { seen: true },
      { new: true }
    );
    res.status(200).json({ reqMsg, message: 'Message seen successfully' });
  } catch (error) {
    res.status(500).json({ result: false, message: error.message });
  }
};
