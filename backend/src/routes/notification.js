const express = require("express");
const router = express.Router();

const { isAuthorised } = require("../middleware/auth");
const {
    getNotification,
    readNotification,
} = require("../controllers/userNotification");

router.route("/user/notifications").get(isAuthorised, getNotification);
router
    .route("/user/read/notification/:notificationId")
    .put(isAuthorised, readNotification);

module.exports = router;
