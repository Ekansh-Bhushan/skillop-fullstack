const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    changePassword,
    googleIdVerifyAndLogin,
} = require("../controllers/userAuth");
const { isAuthorised } = require("../middleware/auth");
const {
    followUnfollowUser,
    getProfileFromMentorId,
} = require("../controllers/userUtils");
const {
    getMyProfile,
    getUserProfile,
    getAllUsers,
    searchUsers,
    updateProfile,
    removeAEducation,
    removeAExperence,
    addBackgroundPic,
    getFollowers,
    getFollowings,
    editEducation,
    editExperence,
    getUserByUsername,
    setUsername,
    doIFollow,
    queryUserByUsername,
} = require("../controllers/userProfile");
const {
    resetPassword,
    forgetPassword,
} = require("../controllers/userForgetPassword");
const {
    profilePicUploader,
    profileBackgroundPicUploader,
    introVideoUploader,
} = require("../uploads/handleUploads");
const { userSearchFilter } = require("../controllers/searchFilterController");
const { linkedinAuth } = require("../controllers/linkedinController");
const {
    uploadIntroVideo,
    deleteIntroVideo,
} = require("../controllers/introVideo");
const { checkProfileComplition } = require("../controllers/mentor");

const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").get(logout);
router.route("/user/follow/:userId").put(isAuthorised, followUnfollowUser);
router.route("/user/changePassword").put(isAuthorised, changePassword);
router
    .route("/user/update/profile")
    .put(isAuthorised, profilePicUploader, updateProfile);
router
    .route("/user/remove/education/:educationId")
    .delete(isAuthorised, removeAEducation);
router
    .route("/user/remove/experence/:experenceId")
    .delete(isAuthorised, removeAExperence);

router.route("/user/profile/me").get(isAuthorised, getMyProfile);
router.route("/user/profile/all").get(isAuthorised, getAllUsers);
router.route("/user/profile/:userId").get(getUserProfile);
router.route("/user/profile/search").post(isAuthorised, searchUsers);
router.route("/user/search").get(isAuthorised, userSearchFilter);

router.route("/user/password/forget").post(forgetPassword);
router.route("/user/password/reset/:token").put(resetPassword);

router
    .route("/user/add/boackgroundPic")
    .post(isAuthorised, profileBackgroundPicUploader, addBackgroundPic);
// , isAuthorised, profilePicUploader, addBackgroundPic)

router.route("/user/limkedin").get(linkedinAuth);

router.route("/user/followers").get(isAuthorised, getFollowers);
router.route("/user/followings").get(isAuthorised, getFollowings);

router
    .route("/user/edit/education/:educationId")
    .put(isAuthorised, editEducation);
router
    .route("/user/edit/experence/:experenceId")
    .put(isAuthorised, editExperence);

router
    .route("/user/mentor/:mentorId")
    .get(isAuthorised, getProfileFromMentorId);

// Intro Video Apis
router
    .route("/user/introVideo/upload")
    .post(isAuthorised, introVideoUploader, uploadIntroVideo);
router.route("/user/introVideo/delete").delete(isAuthorised, deleteIntroVideo);

router
    .route("/user/profile/completion/status")
    .get(isAuthorised, checkProfileComplition);

router.route("/user/signin/google").post(googleIdVerifyAndLogin);

router.route("/user/username/:username").get(getUserByUsername);
router.route("/user/query/from/username").get(queryUserByUsername);

router.route("/user/is/following/:userId").get(isAuthorised, doIFollow);
module.exports = router;
