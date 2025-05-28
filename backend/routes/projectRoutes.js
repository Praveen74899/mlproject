const express = require('express');
const router = express.Router();

// Controller function import karo
const { createProject, getAllProject} = require('../controllers/projectController');


// POST route
router.post('/projects', createProject);
router.get('/projects', getAllProject);

module.exports = router;
