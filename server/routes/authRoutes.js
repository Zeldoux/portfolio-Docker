// Importing the Express framework
const express = require('express');

// Creating a new router instance for defining authentication-related routes
const router = express.Router();

// Importing the controller for handling user authentication (signup, login)
const userCtrl = require('../controllers/authCtrl');

// POST route for user registration
// Controller: Handles user signup logic (e.g., saving user data to the database)
router.post('/signup', userCtrl.signup);

// POST route for user login
// Controller: Handles user login logic (e.g., validating credentials and issuing tokens)
router.post('/login', userCtrl.login);

// Exporting the router to be used in the main application
module.exports = router;
