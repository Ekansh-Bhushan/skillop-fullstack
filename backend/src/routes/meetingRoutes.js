const express = require('express');
const { isAuthorised } = require('../middleware/auth');
const { scheduleZoomMeet, listAllMeetings } = require('../controllers/scheduleZoomMeet');
const router = express.Router();

router.route('/create-meeting/:auth_code').post( scheduleZoomMeet);
router.route('/fetch-all/:auth_code').post(isAuthorised, listAllMeetings);

module.exports = router;