const { AdminSendNotification } = require("../../controllers/adminControllers/adminActions/manageNotification");

const router = require("express").Router();

router.route("/send/notification").post(AdminSendNotification);

module.exports = router;