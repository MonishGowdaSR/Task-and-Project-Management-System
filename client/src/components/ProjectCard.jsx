const ProjectCard = ({
  project,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-3">
        {project.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {project.description}
      </p>

      <p className="mb-6">
        Deadline:{" "}
        {new Date(
          project.deadline
        ).toLocaleDateString()}
      </p>

      <div className="flex gap-4">

        <button
          onClick={() => onEdit(project)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default ProjectCard;