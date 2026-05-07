const TaskCard = ({
  task,
  onDelete,
  onEdit,
}) => {

  const priorityColor = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-red-500",
  };

  const statusColor = {
    "To Do": "bg-gray-500",
    "In Progress": "bg-blue-500",
    Completed: "bg-green-500",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-3">
        {task.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {task.description}
      </p>

      <div className="mb-3">

        <span className="font-semibold">
          Priority:
        </span>

        <span
          className={`ml-2 font-bold ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      <div className="mb-5">

        <span className="font-semibold">
          Status:
        </span>

        <span
          className={`ml-2 text-white px-3 py-1 rounded-full text-sm ${statusColor[task.status]}`}
        >
          {task.status}
        </span>

      </div>

      <div className="mb-6">

        <span className="font-semibold">
          Project:
        </span>

        <span className="ml-2">
          {task.project?.title || "No Project"}
        </span>

      </div>

      <div className="flex gap-4">

        <button
          onClick={() => onEdit(task)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default TaskCard;