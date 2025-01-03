// Importing the Project model for database interaction
const Project = require('../models/project');

// Importing the file system module (currently unused, can be removed if not needed)
const fs = require('fs');

// Controller for creating a new project
exports.createProject = (req, res, next) => {
  console.log('req.auth:', req.auth);
  console.log('req.body:', req.body);

  // Ensure the user is authenticated
  if (!req.auth || !req.auth.userId) {
    console.error('User not authenticated');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Create a new project instance with user ID and project data
  const project = new Project({
    ...req.body,
    userId: req.auth.userId,
    imageUrl: req.body.imageUrl || [], // Handle image URLs as an array
  });

  // Save the project to the database
  project.save()
    .then(() => res.status(201).json({ message: 'Project registered' }))
    .catch((error) => {
      console.error('Error saving project:', error);
      res.status(400).json({ error });
    });
};

// Controller for updating an existing project
exports.modifyProject = (req, res, next) => {
  const projectData = req.file
    ? {
        ...JSON.parse(req.body.project),
        imageUrls: req.body.imageUrls || [],
      }
    : { ...req.body };

  delete projectData.userId; // Prevent user ID modification

  Project.findOne({ _id: req.params.id })
    .then((project) => {
      if (project.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Project.updateOne(
          { _id: req.params.id },
          { ...projectData, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Object modified!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// Controller for deleting a project
exports.deleteProject = (req, res, next) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => {
      if (project.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Project.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Project Deleted' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Controller for fetching all projects
exports.getAllProject = (req, res, next) => {
  Project.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }));
};

// Controller for fetching a single project by ID
exports.getOneProject = (req, res, next) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(404).json({ error }));
};
