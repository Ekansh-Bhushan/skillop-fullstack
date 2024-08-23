const express = require('express');
const router = express.Router();
const hintController = require('../../controllers/MLEvent/mlEventHint'); 

// Route to create a new hint for a specific questionId
router.post('/hints', hintController.createHint);


// Route to get a specific hint by questionId and hintId
router.get('/hint/:questionId/:hintId', hintController.getHintById);

module.exports = router;
