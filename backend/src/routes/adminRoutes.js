const express = require('express');
const { isAuthorised, isAdmin } = require('../middleware/auth');
const { getApplicantsForMentor, getELegibleApplicantsForMentor, makeMentor } = require('../controllers/adminControllers/addMentors');
const { beAdmin } = require('../controllers/adminControllers/addAdmin');

const router = express.Router();

router.route("/get/applicants/for/mentor").get(isAuthorised, isAdmin, getApplicantsForMentor);
router.route("/get/elegible/for/mentor").get(isAuthorised, isAdmin, getELegibleApplicantsForMentor);
router.route("/make/mentor/:userId").post(isAuthorised, isAdmin, makeMentor)
router.route("/be").post(isAuthorised, beAdmin);

module.exports = router;