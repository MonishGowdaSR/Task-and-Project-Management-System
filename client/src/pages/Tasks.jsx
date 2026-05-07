import { useEffect, useState } from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import TaskCard from "../components/TaskCard";

const Tasks = () => {

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [editingTask, setEditingTask] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    project: "",
  });

  useEffect(() => {

    fetchTasks();

    fetchProjects();

  }, []);

  const fetchTasks = async () => {

    try {

      const { data } = await API.get("/tasks");

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchProjects = async () => {

    try {

      const { data } = await API.get("/projects");

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingTask) {

        await API.put(
          `/tasks/${editingTask._id}`,
          formData
        );

      } else {

        await API.post(
          "/tasks",
          formData
        );
      }

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        project: "",
      });

      setEditingTask(null);

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  const handleEdit = (task) => {

    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      project: task.project?._id || "",
    });
  };

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Tasks
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">

          {editingTask
            ? "Edit Task"
            : "Create Task"}

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            required
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          >

            <option value="To Do">
              To Do
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

          <select
            name="project"
            value={formData.project}
            onChange={handleChange}
            className="p-3 border rounded-lg"
          >

            <option value="">
              Select Project
            </option>

            {projects.map((project) => (

              <option
                key={project._id}
                value={project._id}
              >
                {project.title}
              </option>

            ))}

          </select>

        </div>

        <button
          type="submit"
          className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
        >

          {editingTask
            ? "Update Task"
            : "Create Task"}

        </button>

      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {tasks.map((task) => (

          <TaskCard
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

        ))}

      </div>

    </DashboardLayout>
  );
};

export default Tasks;