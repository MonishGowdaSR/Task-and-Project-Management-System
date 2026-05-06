// controllers/projectController.js

const Project = require("../models/Project");

exports.createProject = async (req, res) => {
    const project = await Project.create({
        ...req.body,
        createdBy: req.user._id,
    });

    res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find({
        createdBy: req.user._id,
    });

    res.json(projects);
};

exports.updateProject = async (req, res) => {
    const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updated);
};

exports.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
        message: "Project deleted",
    });
};