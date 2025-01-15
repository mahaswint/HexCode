const express = require('express');
const { getMyData, updateMyData, getMyProjects, getUserById } = require('../controllers/userController');
// console.log("in router user");
// console.log(require('../controllers/userController'));


const router = express.Router();

// Route to get the logged-in user's data
router.get('/my',  getMyData);

// Route to update the logged-in user's data
router.put('/my',  updateMyData);

// Route to get the logged-in user's projects
router.get('/my/project',  getMyProjects);

// Route to get another user by ID
router.get('/:userid',  getUserById);

module.exports = router;