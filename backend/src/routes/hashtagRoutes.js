const {
    queryHashtags,
    getPostWithHashtag,
    getUserWithHashtag,
} = require("../controllers/hashtagController");

const router = require("express").Router();

router.route("/get/suggestion/:hashtag").get(queryHashtags);
router.route("/get/posts/:hashtag").get(getPostWithHashtag);
router.route("/get/users/:hashtag").get(getUserWithHashtag);

module.exports = router;
