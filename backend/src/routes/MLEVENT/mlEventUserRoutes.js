const express = require('express');
const router = express.Router();
const mlEventUserController = require('../../controllers/MLEvent/mlEventUserAuth'); 

router.post('/register', mlEventUserController.registerUser);
router.get('/teams', mlEventUserController.getAllTeams);

module.exports = router;
