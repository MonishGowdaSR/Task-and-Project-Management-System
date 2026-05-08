import { useEffect, useState } from "react";

import API from "../api/axios";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const Dashboard = () => {

  const [stats, setStats] =
    useState({
      totalProjects: 0,
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
    });

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {

    fetchDashboardData();

    fetchTasks();

  }, []);

  const fetchDashboardData =
    async () => {

      try {

        const { data } =
          await API.get(
            "/dashboard"
          );

        setStats(data);

      } catch (error) {

        console.log(error);
      }
    };

  const fetchTasks = async () => {

    try {

      const { data } =
        await API.get(
          "/tasks"
        );

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };

  const pieData = [
    {
      name: "Completed",
      value:
        stats.completedTasks,
    },
    {
      name: "Pending",
      value:
        stats.pendingTasks,
    },
    {
      name: "In Progress",
      value:
        stats.inProgressTasks,
    },
  ];

  const barData = [
    {
      status: "Completed",
      tasks:
        stats.completedTasks,
    },
    {
      status: "Pending",
      tasks:
        stats.pendingTasks,
    },
    {
      status: "In Progress",
      tasks:
        stats.inProgressTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
  ];

  const recentTasks =
    tasks.slice(0, 5);

  return (

    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      {/* Summary Cards */}

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

      {/* Charts Section */}

      <div className="grid lg:grid-cols-2 gap-6 mt-10">

        {/* Pie Chart */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Task Distribution
          </h2>

          <div className="w-full h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >

                  {pieData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Tasks by Status
          </h2>

          <div className="w-full h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={barData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="status" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="tasks"
                  fill="#3b82f6"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* Recent Tasks */}

      <div className="bg-white mt-10 p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Recent Tasks
        </h2>

        {recentTasks.length === 0 ? (

          <p className="text-gray-500">
            No tasks available
          </p>

        ) : (

          <div className="space-y-4">

            {recentTasks.map(
              (task) => (

                <div
                  key={task._id}
                  className="border p-4 rounded-lg flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-bold text-lg">

                      {task.title}

                    </h3>

                    <p className="text-gray-500">

                      {task.description}

                    </p>

                  </div>

                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">

                    {task.status}

                  </span>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;