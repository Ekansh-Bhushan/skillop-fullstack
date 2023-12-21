const { addAdminEvent, deleteAdminEvent, getAllAdminEvents } = require("../../controllers/adminControllers/adminActions/manageEvents");
const { AdminSendNotification } = require("../../controllers/adminControllers/adminActions/manageNotification");

const router = require("express").Router();

router.route("/send/notification").post(AdminSendNotification);

// Events
router.route("/event/create").post(addAdminEvent);
router.route("/event/delete/:eventId").delete(deleteAdminEvent);
router.route("/event/all").get(getAllAdminEvents);


module.exports = router;