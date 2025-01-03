// Importing the Express framework
const express = require('express');

// Creating a new router instance for defining contact-related routes
const router = express.Router();

// Importing the contact controller that handles email-related logic
const contactController = require('../controllers/contactCtrl');

// Importing middleware for verifying ALTCHA Captcha solutions
const altchaMiddleware = require('../middleware/altchaMiddleware'); // Adjust path if necessary

// POST route for sending an email
// Middleware: Verifies the ALTCHA Captcha solution before proceeding
// Controller: Handles the logic for sending the email
router.post('/', altchaMiddleware.verifyAltchaSolution, contactController.sendEmail);

// Exporting the router to be used in the main application
module.exports = router;
