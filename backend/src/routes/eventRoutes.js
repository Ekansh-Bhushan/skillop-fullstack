const express = require("express");
const { isAuthorised, isMentor } = require("../middleware/auth");
const { createEvent } = require("../controllers/eventController");

const router = express.Router();

router.route("/create").post(isAuthorised, isMentor, createEvent);

module.exports = router;