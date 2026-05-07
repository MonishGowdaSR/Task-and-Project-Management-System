import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import ProjectCard from "../components/ProjectCard";

const Projects = () => {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      deadline: "",
    });

  useEffect(() => {

    fetchProjects();

  }, []);

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

      if (editingProject) {

        await API.put(
          `/projects/${editingProject._id}`,
          formData
        );

        toast.success(
          "Project updated successfully"
        );

      } else {

        await API.post(
          "/projects",
          formData
        );

        toast.success(
          "Project created successfully"
        );
      }

      setFormData({
        title: "",
        description: "",
        deadline: "",
      });

      setEditingProject(null);

      fetchProjects();

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
        "Delete this project?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/projects/${id}`
      );

      toast.success(
        "Project deleted successfully"
      );

      fetchProjects();

    } catch (error) {

      toast.error(
        "Failed to delete project"
      );
    }
  };

  const handleEdit = (project) => {

    setEditingProject(project);

    setFormData({
      title: project.title,
      description:
        project.description,
      deadline:
        project.deadline.split("T")[0],
    });
  };

  return (

    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Projects
        </h1>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">

          {editingProject
            ? "Edit Project"
            : "Create Project"}

        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            name="title"
            placeholder="Project Title"
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

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="p-3 border rounded-lg"
            required
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >

          {loading
            ? editingProject
              ? "Updating..."
              : "Creating..."
            : editingProject
            ? "Update Project"
            : "Create Project"}

        </button>

      </form>

      {projects.length === 0 ? (

        <div className="bg-white p-10 rounded-xl shadow text-center">

          <h2 className="text-2xl font-bold mb-3">
            No Projects Found
          </h2>

          <p className="text-gray-500">
            Create your first project
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />

          ))}

        </div>

      )}

    </DashboardLayout>
  );
};

export default Projects;