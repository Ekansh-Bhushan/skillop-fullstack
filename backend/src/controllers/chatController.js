const ChatModel = require("../models/chatModels");
const User = require("../models/user");
exports.createChat = async (req, res) => {
  // check if senderid and receiverid exist
  if (!req.body.senderId || !req.body.receiverId) {
    return res.status(400).send({
      result: false,
      message: "senderId and receiverId are required",
    });
  }
  // check if ids are correct user id
  const senderUser = await User.findById(req.body.senderId);
  const receiverUser = await User.findById(req.body.receiverId);
  if (!senderUser || !receiverUser) {
    return res.status(400).send({
      result: false,
      message: "senderId or receiverId is not correct",
    });
  }

  // check if chat already exist
  const chat = await ChatModel.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });
  if (chat) {
    return res.status(400).send({
      result: false,
      message: "chat already exist",
    });
  }
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({
      result: false,
      message: "internal server error",
      error,
    });
  }
};

exports.userChats = async (req, res) => {
  try {
    const userToChat = await User.findById(req.params.userId);
    if (!userToChat) {
      return res.status(400).send({
        result: false,
        message: "user not found",
      });
    }

    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    if (!chat) {
      // create a chat
      const newChat = new ChatModel({
        members: [req.user._id, req.params.userId],
      });
      const result = await newChat.save();
      return res.status(200).json(result);
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).send({
      result: false,
      message: "internal server error",
      error,
    });
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    if (!chat) {
      return res.status(400).send({
        result: false,
        message: "chat not found",
      });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).send({
      result: false,
      message: "internal server error",
      error,
    });
  }
};
