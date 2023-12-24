const express = require("express");
const { isAuthorised, isAdmin } = require("../../middleware/auth");
const {
    getFeedbacks,
} = require("../../controllers/adminControllers/querySiteMatrics/getFeedbacks");
const {
    getMeetingMatrics,
} = require("../../controllers/adminControllers/querySiteMatrics/getMeetingMatrics");
const {
    getMentorMatrics,
    getHighestEarner,
} = require("../../controllers/adminControllers/querySiteMatrics/getMentorMatrics");
const {
    getPostMatrics,
} = require("../../controllers/adminControllers/querySiteMatrics/getPostMatrics");
const {
    getDeadUser,
    getNewSignUp,
    getMostFollowedUser,
    getMostActiveUser,
} = require("../../controllers/adminControllers/querySiteMatrics/getUserMatrics");
const {
    getSiteMatrics,
} = require("../../controllers/adminControllers/querySiteMatrics/getSitrMatrics");
const router = express.Router();

router.route("/feedback").get(isAuthorised, isAdmin, getFeedbacks);
router.route("/meet/list").get(isAuthorised, isAdmin, getMeetingMatrics);
router.route("/mentor/matrix").get(isAuthorised, isAdmin, getMentorMatrics);
router.route("/post/matrix").get(isAuthorised, isAdmin, getPostMatrics);
router.route("/dead/users").get(getDeadUser);
router.route("/users/new").get(getNewSignUp);
router.route("/users/most/active").get(getMostActiveUser);
router.route("/most/followed").get(getMostFollowedUser);
router.route("/highest/earning").get(getHighestEarner);

router.route("/site/matrix").get(getSiteMatrics);

module.exports = router;
