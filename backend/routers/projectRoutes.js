const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController'); // Adjust the path as necessary

// Route for adding a new project
router.post('/projects/:pid', projectController.addProject);

// Route for editing an existing project
router.put('/projects/:pid', projectController.editProject);

// Route for deleting a project
router.delete('/projects/:pid', projectController.deleteProject);

module.exports = router;
