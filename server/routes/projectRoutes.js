const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");


// Create + Get All Projects
router.route("/")
.post(protect, createProject)
.get(protect, getProjects);


// Single Project Operations
router.route("/:id")
.get(protect, getProjectById)
.put(protect, updateProject)
.delete(protect, deleteProject);

module.exports = router;