const express = require("express");
const {
    createPost,
    likeAndUnlikePost,
    deletePost,
    getPostsFromFollowings,
    getPostsFromUser,
    getPosts,
    getPostsFromAll,
    updatePost,
    disableComments,
    getWhoLikedPost,
    getPostsFromHashtag,
} = require("../controllers/post");
const { isAuthorised } = require("../middleware/auth");
const {
    addComment,
    deleteComment,
    getComments,
} = require("../controllers/userComment");
const { postImagesUploader } = require("../uploads/handleUploads");
const { filterPosts } = require("../controllers/searchFilterController");
const router = express.Router();

router.route("/post/create").post(isAuthorised, postImagesUploader, createPost);
router.route("/post/like/:postId").put(isAuthorised, likeAndUnlikePost);
router.route("/post/delete/:postId").delete(isAuthorised, deletePost);
router.route("/post/from/followings").get(isAuthorised, getPostsFromFollowings);
router.route("/post/from/all").get(isAuthorised, getPostsFromAll);
router.route("/post/from/:userId").get(isAuthorised, getPostsFromUser);
router.route("/post/:postId").get(getPosts);
router
    .route("/post/update/:postId")
    .post(isAuthorised, postImagesUploader, updatePost);

router.route("/post/comment/add/:postId").post(isAuthorised, addComment);
router.route("/post/get/comments/:postId").get(isAuthorised, getComments);
router
    .route("/post/comment/delete/:commentId")
    .delete(isAuthorised, deleteComment);

router
    .route("/post/disableComments/:postId")
    .put(isAuthorised, disableComments);

router.route("/post/get/likers/:postId").get(isAuthorised, getWhoLikedPost);

router.route("/post/search").get(isAuthorised, filterPosts);

router.route("/post/hashtags/:hashtag").get(getPostsFromHashtag);

module.exports = router;
