// routes/scoreRoutes.js
const express = require('express');
const { getUserPoints, addPoints, deductPoints } = require('../controllers/scoreController');
const router = express.Router();

// Route to get user's points
router.get('/points', getUserPoints);

// Route to add points
router.post('/points/add', addPoints);

// Route to deduct points for hint usage
router.post('/points/deduct', deductPoints);

module.exports = router;
