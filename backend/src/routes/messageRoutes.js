const express = require("express");

const { addMessage, getMessages } = require("../controllers/messageController");
const { isAuthorised } = require("../middleware/auth");

const router = express.Router();

router.post("/", isAuthorised, addMessage);

router.get("/:chatId", isAuthorised, getMessages);

module.exports = router;
