const Project = require("../models/Project");
const Task = require("../models/Task");

exports.getDashboardStats = async (req, res) => {

    try {

        const totalProjects = await Project.countDocuments({
            createdBy: req.user._id,
        });

        const totalTasks = await Task.countDocuments({
            createdBy: req.user._id,
        });

        const completedTasks = await Task.countDocuments({
            createdBy: req.user._id,
            status: "Completed",
        });

        const pendingTasks = await Task.countDocuments({
            createdBy: req.user._id,
            status: "To Do",
        });

        const inProgressTasks = await Task.countDocuments({
            createdBy: req.user._id,
            status: "In Progress",
        });

        res.json({
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks,
            inProgressTasks,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};