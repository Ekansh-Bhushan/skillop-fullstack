const { replyComment, likeComment } = require("../controllers/userComment");
const { isAuthorised } = require("../middleware/auth");

const router = require("express").Router();

router.route("/reply/add/:commentId").post(isAuthorised, replyComment);
router.route("/like/:commentId").put(isAuthorised, likeComment);

module.exports = router;
