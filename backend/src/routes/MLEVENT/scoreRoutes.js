// src/routes/MLEvent/scoreRoutes.js
const express = require('express');
const { getUserPoints, addPoints, deductPoints } = require('../../controllers/MLEvent/scoreController');
const authenticateToken = require('../../middleware/authMiddleware');
const router = express.Router();

// Route to get user's points (requires authentication)
router.get('/points', authenticateToken, getUserPoints);

// Route to add points (requires authentication)
router.post('/points/add', authenticateToken, addPoints);

// Route to deduct points (requires authentication)
router.post('/points/deduct', authenticateToken, deductPoints);

module.exports = router;
