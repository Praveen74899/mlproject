// controllers/projectController.js
const Project = require('../models/Project');


// Controller function
exports.createProject = async (req, res) => {
  try {
    const {
      projectName,
      projectType,
      category,
      hours,
      dateReceived,
      dateDelivered,
      contactPerson,
      endClient,
    } = req.body;


    if (!projectName || !projectType || !category || !hours || !dateReceived || !dateDelivered || !contactPerson || !endClient) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check duplicate
    const existingProject = await Project.findOne({ projectName });
    if (existingProject) {
      return res.status(400).json({ message: 'Project name already exists. Choose another name.' });
    }
    // Create new project
    const newProject = new Project({
      projectName,
      projectType,
      category,
      hours,
      dateReceived,
      dateDelivered,
      contactPerson,
      endClient
    });

    // Save to DB
    await newProject.save();

    res.status(201).json({
      message: 'Project created successfully',
      project: newProject
    });


  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      message: 'Error creating project',
      error: error.message

    });
  }
};



exports.getAllProject = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};
