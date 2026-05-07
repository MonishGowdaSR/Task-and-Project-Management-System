import { useState } from "react";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

const DashboardLayout = ({
  children,
}) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;