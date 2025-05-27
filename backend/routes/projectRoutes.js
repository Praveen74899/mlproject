const express = require('express');
const router = express.Router();

// Controller function import karo
const { createProject } = require('../controllers/projectController');


// POST route
router.post('/projects', createProject);

module.exports = router;
