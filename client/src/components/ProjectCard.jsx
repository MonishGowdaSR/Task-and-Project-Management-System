const ProjectCard = ({
  project,
  onDelete,
  onEdit,
}) => {

  const deadlineDate =
    new Date(project.deadline);

  const today =
    new Date();

  const timeDifference =
    deadlineDate - today;

  const daysRemaining =
    Math.ceil(
      timeDifference /
      (1000 * 60 * 60 * 24)
    );

  let statusText = "";
  let statusColor = "";

  if (daysRemaining < 0) {

    statusText = "Overdue";

    statusColor =
      "bg-red-100 text-red-600";

  } else if (daysRemaining <= 3) {

    statusText = "Due Soon";

    statusColor =
      "bg-yellow-100 text-yellow-700";

  } else {

    statusText = "On Track";

    statusColor =
      "bg-green-100 text-green-600";
  }

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <div className="flex justify-between items-start mb-4">

        <h2 className="text-2xl font-bold">
          {project.title}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
        >
          {statusText}
        </span>

      </div>

      <p className="text-gray-600 mb-4 break-words">

        {project.description}

      </p>

      <div className="mb-6">

        <p className="font-semibold">

          Deadline:

          <span className="ml-2 font-normal">

            {new Date(
              project.deadline
            ).toLocaleDateString()}

          </span>

        </p>

        <p className="mt-2 text-sm text-gray-500">

          {daysRemaining < 0
            ? `${Math.abs(daysRemaining)} days overdue`
            : `${daysRemaining} days remaining`}

        </p>

      </div>

      <div className="flex gap-4">

        <button
          onClick={() =>
            onEdit(project)
          }
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(project._id)
          }
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default ProjectCard;