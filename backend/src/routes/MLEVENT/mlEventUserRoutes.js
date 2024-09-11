const express = require('express');
const router = express.Router();
const mlEventUserController = require('../../controllers/MLEvent/mlEventUserAuth'); 
const upload = require('../../middleware/uploadMiddleware');

router.post('/register',upload, mlEventUserController.registerUser);
router.get('/teams', mlEventUserController.getAllTeams);
router.post('/login', mlEventUserController.loginUser);

module.exports = router;
