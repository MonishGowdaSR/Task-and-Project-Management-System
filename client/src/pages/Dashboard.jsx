import { useEffect, useState } from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  });

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const { data } = await API.get("/dashboard");

        setStats(data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchDashboardData();

  }, []);

  const pieData = [
    {
      name: "Completed",
      value: stats.completedTasks,
    },
    {
      name: "Pending",
      value: stats.pendingTasks,
    },
    {
      name: "In Progress",
      value: stats.inProgressTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
  ];

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl mb-2">
            Total Projects
          </h2>

          <p className="text-4xl font-bold">
            {stats.totalProjects}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl mb-2">
            Total Tasks
          </h2>

          <p className="text-4xl font-bold">
            {stats.totalTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl mb-2">
            Completed
          </h2>

          <p className="text-4xl font-bold text-green-500">
            {stats.completedTasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl mb-2">
            Pending
          </h2>

          <p className="text-4xl font-bold text-red-500">
            {stats.pendingTasks}
          </p>
        </div>

      </div>

      <div className="bg-white mt-10 p-8 rounded-xl shadow h-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Task Analytics
        </h2>

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              dataKey="value"
              label
            >

              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;