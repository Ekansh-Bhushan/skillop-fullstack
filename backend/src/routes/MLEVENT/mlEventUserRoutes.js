// mlEventUserRoutes.js
const express = require('express');
const router = express.Router();
const mlEventUserController = require('../../controllers/MLEvent/mlEventUserAuth'); 
// Define the POST route for user registration
router.post('/register', mlEventUserController.registerUser);

module.exports = router;
