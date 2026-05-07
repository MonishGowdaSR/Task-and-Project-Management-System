import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-10">
        AI Project Manager
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-gray-700 p-3 rounded-lg"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="hover:bg-gray-700 p-3 rounded-lg"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="hover:bg-gray-700 p-3 rounded-lg"
        >
          Tasks
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 mt-10 p-3 rounded-lg"
        >
          Logout
        </button>

      </nav>

    </div>
  );
};

export default Sidebar;