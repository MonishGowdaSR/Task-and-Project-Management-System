const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        default: "",
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },

    status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do",
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Task", taskSchema);