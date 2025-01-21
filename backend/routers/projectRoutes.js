const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController'); // Adjust the path as necessary

// Route for adding a new project
router.post('/:pid/add', projectController.addProject);

// Route for editing an existing project
router.put('/:pid/edit', projectController.editProject);

// Route for deleting a project
router.delete('/:pid/delete', projectController.deleteProject);
router.get('/visible',projectController.getAllProjects);

module.exports = router;
