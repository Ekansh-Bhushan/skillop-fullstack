const express = require('express');
const router = express.Router();
const mlEventUserController = require('../../controllers/MLEvent/mlEventUserAuth'); 
const upload = require('../../middleware/uploadMiddleware');

// Register, login, and fetch teams routes
router.post('/register', upload, mlEventUserController.registerUser);
router.get('/teams', mlEventUserController.getAllTeams);
router.post('/login', mlEventUserController.loginUser);

// Leaderboard route
router.get('/leaderboard', mlEventUserController.getLeaderboard);

module.exports = router;
