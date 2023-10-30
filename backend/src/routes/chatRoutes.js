const express = require("express");

const {
  createChat,
  userChats,
  findChat,
} = require("../controllers/chatController");
const { isAuthorised } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(isAuthorised,createChat);
router.route("/:userId").get(isAuthorised, userChats);
router.route("/find/:firstId/:secondId").get(isAuthorised, findChat);

module.exports = router;
