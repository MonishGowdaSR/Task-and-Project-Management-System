const Project = require("../models/Project");


// Create Project
exports.createProject = async (req, res) => {

    try {

        const { title, description, deadline } = req.body;

        const project = await Project.create({
            title,
            description,
            deadline,
            createdBy: req.user._id,
        });

        res.status(201).json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Get All User Projects
exports.getProjects = async (req, res) => {

    try {

        const projects = await Project.find({
            createdBy: req.user._id,
        });

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Get Single Project
exports.getProjectById = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Update Project
exports.updateProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        project.title =
            req.body.title || project.title;

        project.description =
            req.body.description || project.description;

        project.deadline =
            req.body.deadline || project.deadline;

        const updatedProject = await project.save();

        res.json(updatedProject);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Delete Project
exports.deleteProject = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        await project.deleteOne();

        res.json({
            message: "Project deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};