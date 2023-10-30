const express = require("express");

const router = express.Router();

const { isAuthorised } = require("../middleware/auth");
const {
    getFeedbackOnPlatform,
    giveFeedbackToMentorOnMeet,
} = require("../controllers/feedBackController");

router.route("/to/platform").post(isAuthorised, getFeedbackOnPlatform);
router.route("/to/mentor/on/meet").post(isAuthorised, giveFeedbackToMentorOnMeet);

module.exports = router;
