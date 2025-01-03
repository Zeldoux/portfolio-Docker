// Importing the Express framework
const express = require("express");

// Creating a new router instance for defining project-related routes
const router = express.Router();

// Importing the project controller that handles project-related logic
const projectCtrl = require('../controllers/projectCtrl');

// Importing authentication middleware to protect specific routes
const auth = require('../middleware/auth');

// Protected Routes - Require authentication

// POST route for adding a new project
// Middleware: Verifies the user token before allowing access
// Controller: Handles the logic for creating a new project
router.post('/', auth, projectCtrl.createProject);

// PUT route for updating an existing project by its ID

router.put('/:id', auth, projectCtrl.modifyProject);

// DELETE route for deleting a project by its ID

router.delete('/:id', auth, projectCtrl.deleteProject);

// Public Routes - Accessible without authentication

// GET route for fetching all projects
// Controller: Handles the logic for retrieving all projects
router.get('/', projectCtrl.getAllProject);

// GET route for fetching a single project by its ID
// Controller: Handles the logic for retrieving a specific project
router.get('/:id', projectCtrl.getOneProject);

// Exporting the router to be used in the main application
module.exports = router;
