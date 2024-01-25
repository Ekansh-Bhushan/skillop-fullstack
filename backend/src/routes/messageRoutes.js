const express = require("express");

const { addMessage, getMessages, seenMessage } = require("../controllers/messageController");
const { isAuthorised } = require("../middleware/auth");

const router = express.Router();

router.post("/", isAuthorised, addMessage);

router.get("/:chatId", isAuthorised, getMessages);

router.put('/seen/:msgID', isAuthorised, seenMessage);

module.exports = router;
