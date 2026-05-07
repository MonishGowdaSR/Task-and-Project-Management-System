import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (

    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}

      {/* Sidebar */}

      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          bg-gray-900 text-white
          w-64 min-h-screen p-6
          transform transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        <h1 className="text-2xl font-bold mb-10">
          AI Project Manager
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            to="/dashboard"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="hover:bg-gray-700 p-3 rounded-lg"
          >
            Dashboard
          </Link>

          <Link
            to="/projects"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="hover:bg-gray-700 p-3 rounded-lg"
          >
            Projects
          </Link>

          <Link
            to="/tasks"
            onClick={() =>
              setSidebarOpen(false)
            }
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
    </>
  );
};

export default Sidebar;