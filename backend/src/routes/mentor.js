const express = require('express');
const { isAuthorised } = require('../middleware/auth');
const {
  becomeAMentor,
  requestAppointment,
  getAvailability,
  updateAvailability,
  deleteAvailability,
  getMeets,
  getActualAvailability,
  acceptMeet,
  getUpcommingMeet,
  getPendingMeet,
  getCompletedMeet,
  getEarnings,
  requestToBeMentor,
  setDataForMentor,
  createToken,
  createMeetEvent,
} = require('../controllers/mentor');
const { paymentConformationPicUploader } = require('../uploads/handleUploads');
const router = express.Router();

// router.route("/mentor/become").put(isAuthorised, becomeAMentor);
router
  .route('/mentor/book/:mentorId')
  .post(isAuthorised, paymentConformationPicUploader, requestAppointment);
router
  .route('/mentor/availability/:mentorId')
  .post(isAuthorised, getAvailability);
router
  .route('/mentor/update/availability')
  .put(isAuthorised, updateAvailability);
router
  .route('/mentor/delete/slot/:day')
  .put(isAuthorised, deleteAvailability);
router.route('/mentor/meets').get(isAuthorised, getMeets);
router.route('/mentor/meet/upcomming').get(isAuthorised, getUpcommingMeet);
router.route('/mentor/meet/pending').get(isAuthorised, getPendingMeet);
router.route('/mentor/meet/completed').get(isAuthorised, getCompletedMeet);
router
  .route('/mentor/getAvailability')
  .get(isAuthorised, getActualAvailability);
router.route('/mentor/meet/accept/:meetId').put(isAuthorised, acceptMeet);
router.route('/mentor/meet/create-tokens').post(isAuthorised, createToken);
router
  .route('/mentor/meet/create-meet-event')
  .post(isAuthorised, createMeetEvent);

router.route('/mentor/earnings').get(isAuthorised, getEarnings);

router.route('/mentor/request').put(isAuthorised, requestToBeMentor);
router.route('/mentor/set').put(isAuthorised, setDataForMentor);
module.exports = router;
