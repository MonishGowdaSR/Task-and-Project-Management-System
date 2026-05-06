const Task = require("../models/Task");


// Create Task
exports.createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            priority,
            status,
            assignedTo,
            project,
        } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            status,
            assignedTo,
            project,
            createdBy: req.user._id,
        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Get All Tasks
exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            createdBy: req.user._id,
        })
        .populate("assignedTo", "name email")
        .populate("project", "title");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Get Single Task
exports.getTaskById = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)
        .populate("assignedTo", "name email")
        .populate("project", "title");

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Update Task
exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        task.title =
            req.body.title || task.title;

        task.description =
            req.body.description || task.description;

        task.priority =
            req.body.priority || task.priority;

        task.status =
            req.body.status || task.status;

        task.assignedTo =
            req.body.assignedTo || task.assignedTo;

        const updatedTask = await task.save();

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};


// Delete Task
exports.deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        await task.deleteOne();

        res.json({
            message: "Task deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};