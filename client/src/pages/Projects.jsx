import { useEffect, useState } from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import ProjectCard from "../components/ProjectCard";

const Projects = () => {

  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [editingProject, setEditingProject] =
    useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

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

      if (editingProject) {

        await API.put(
          `/projects/${editingProject._id}`,
          formData
        );

      } else {

        await API.post(
          "/projects",
          formData
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

      console.log(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(`/projects/${id}`);

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
  };

  const handleEdit = (project) => {

    setEditingProject(project);

    setFormData({
      title: project.title,
      description: project.description,
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
          className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
        >

          {editingProject
            ? "Update Project"
            : "Create Project"}

        </button>

      </form>

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

    </DashboardLayout>
  );
};

export default Projects;