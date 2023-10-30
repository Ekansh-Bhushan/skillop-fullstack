const express = require("express");
const { isAuthorised } = require("../middleware/auth");
const {
    getMeets,
    getAcceptedMeet,
    getRejectedMeets,
    getPendingMeets,
    getCompletedMeet,
} = require("../controllers/mentee");
const router = express.Router();

router.route("/mentee/meets").get(isAuthorised, getMeets);
router.route("/mentee/meet/accepted").get(isAuthorised, getAcceptedMeet);
router.route("/mentee/meet/rejected").get(isAuthorised, getRejectedMeets);
router.route("/mentee/meet/pending").get(isAuthorised, getPendingMeets);
router.route("/mentee/meet/completed").get(isAuthorised, getCompletedMeet);

module.exports = router;
