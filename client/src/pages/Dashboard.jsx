// pages/Dashboard.jsx

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Completed", value: 8 },
    { name: "Pending", value: 4 },
];

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <div className="bg-white p-4 rounded shadow">
                    <h2>Total Projects</h2>
                    <p className="text-2xl font-bold">5</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2>Total Tasks</h2>
                    <p className="text-2xl font-bold">12</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2>Completed</h2>
                    <p className="text-2xl font-bold">8</p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h2>Pending</h2>
                    <p className="text-2xl font-bold">4</p>
                </div>

            </div>

            <div className="mt-10 bg-white p-6 rounded shadow h-[400px]">

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={120}
                            label
                        >
                            <Cell />
                            <Cell />
                        </Pie>

                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default Dashboard;