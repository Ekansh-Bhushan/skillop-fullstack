const express = require('express');
const router = express.Router();
const mlEventQuestionController = require('../../controllers/MLEvent/mlEventQuestion'); 

// Route to create a new question
router.post('/questions',mlEventQuestionController.createQuestion);


// Route to get a single question by ID
router.get('/questions/:id', mlEventQuestionController.getQuestionById);



module.exports = router;
