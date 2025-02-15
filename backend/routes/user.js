const express = require('express');

// Controller functions for Grievance Forum users
const { loginUser,signupUser } = require('../controllers/userController');

const router = express.Router();

// Login route for Grievance Forum
router.post('/login', loginUser);

// Signup route for Grievance Forum
router.post('/signup', signupUser);

module.exports = router;
