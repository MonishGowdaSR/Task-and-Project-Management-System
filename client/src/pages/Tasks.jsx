import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import TaskCard from "../components/TaskCard";

const Tasks = () => {

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [loading, setLoading] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [formData, setFormData] =
    useState({
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

      const { data } = await API.get(
        "/tasks"
      );

      setTasks(data);

    } catch (error) {

      toast.error(
        "Failed to fetch tasks"
      );
    }
  };

  const fetchProjects = async () => {

    try {

      const { data } = await API.get(
        "/projects"
      );

      setProjects(data);

    } catch (error) {

      toast.error(
        "Failed to fetch projects"
      );
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

    setLoading(true);

    try {

      if (editingTask) {

        await API.put(
          `/tasks/${editingTask._id}`,
          formData
        );

        toast.success(
          "Task updated successfully"
        );

      } else {

        await API.post(
          "/tasks",
          formData
        );

        toast.success(
          "Task created successfully"
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

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this task?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/tasks/${id}`
      );

      toast.success(
        "Task deleted successfully"
      );

      fetchTasks();

    } catch (error) {

      toast.error(
        "Failed to delete task"
      );
    }
  };

  const handleEdit = (task) => {

    setEditingTask(task);

    setFormData({
      title: task.title,
      description:
        task.description,
      priority: task.priority,
      status: task.status,
      project:
        task.project?._id || "",
    });
  };

  const filteredTasks = tasks.filter(
    (task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        task.description
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority ===
          priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    }
  );

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Tasks
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="p-3 border rounded-lg flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="p-3 border rounded-lg"
        >

          <option value="All">
            All Status
          </option>

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
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(
              e.target.value
            )
          }
          className="p-3 border rounded-lg"
        >

          <option value="All">
            All Priority
          </option>

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

      </div>

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
          disabled={loading}
          className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >

          {loading
            ? editingTask
              ? "Updating..."
              : "Creating..."
            : editingTask
            ? "Update Task"
            : "Create Task"}

        </button>

      </form>

      {filteredTasks.length === 0 ? (

        <div className="bg-white p-10 rounded-xl shadow text-center">

          <h2 className="text-2xl font-bold mb-3">
            No Tasks Found
          </h2>

          <p className="text-gray-500">
            Create your first task
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredTasks.map((task) => (

            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />

          ))}

        </div>

      )}

    </DashboardLayout>
  );
};

export default Tasks;