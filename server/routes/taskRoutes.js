const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");


// Create + Get All Tasks
router.route("/")
.post(protect, createTask)
.get(protect, getTasks);


// Single Task Operations
router.route("/:id")
.get(protect, getTaskById)
.put(protect, updateTask)
.delete(protect, deleteTask);

module.exports = router;