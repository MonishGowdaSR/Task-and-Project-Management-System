// components/Sidebar.jsx

import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5">

            <h1 className="text-2xl font-bold mb-8">
                AI Project Manager
            </h1>

            <nav className="flex flex-col gap-4">

                <Link to="/">Dashboard</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/tasks">Tasks</Link>

            </nav>
        </div>
    );
};

export default Sidebar;