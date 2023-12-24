const {
    addAdminEvent,
    deleteAdminEvent,
    getAllAdminEvents,
} = require("../../controllers/adminControllers/adminActions/manageEvents");
const {
    AdminSendNotification,
} = require("../../controllers/adminControllers/adminActions/manageNotification");
const {
    deletePost,
} = require("../../controllers/adminControllers/adminActions/managePost");
const {
    deleteUser,
} = require("../../controllers/adminControllers/adminActions/manageUser");

const router = require("express").Router();

router.route("/send/notification").post(AdminSendNotification);

// Events
router.route("/event/create").post(addAdminEvent);
router.route("/event/delete/:eventId").delete(deleteAdminEvent);
router.route("/event/all").get(getAllAdminEvents);

// post
router.route("/post/delete/:postId").delete(deletePost);

// user
router.route("/user/delete/:userId").delete(deleteUser);

module.exports = router;
