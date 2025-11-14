import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    LineChart,
    CartesianGrid,
    Line,
    PieChart, Pie, Cell, Legend,
} from "recharts";
import img from "../../assets/RMGDashImg1.png";

const itemApprovalData = [
    { month: "Jan", jobs: 40, recruiters: 60 },
    { month: "Feb", jobs: 30, recruiters: 50 },
    { month: "Mar", jobs: 50, recruiters: 70 },
    { month: "Apr", jobs: 60, recruiters: 80 },
    { month: "May", jobs: 40, recruiters: 60 },
    { month: "Jun", jobs: 70, recruiters: 90 },
    { month: "Jul", jobs: 45, recruiters: 55 },
    { month: "Aug", jobs: 35, recruiters: 65 },
    { month: "Sep", jobs: 50, recruiters: 70 },
    { month: "Oct", jobs: 30, recruiters: 50 },
    { month: "Nov", jobs: 55, recruiters: 75 },
    { month: "Dec", jobs: 40, recruiters: 60 },
];

const rangeData = [
    { range: 5000, active: 20, assigned: 30 },
    { range: 10000, active: 30, assigned: 70 },
    { range: 20000, active: 25, assigned: 30 },
    { range: 30000, active: 60, assigned: 45 },
    { range: 35000, active: 90, assigned: 55 },
    { range: 40000, active: 40, assigned: 30 },
    { range: 50000, active: 70, assigned: 40 },
    { range: 55000, active: 50, assigned: 80 },
    { range: 60000, active: 30, assigned: 100 },
];

const chartData = [
    { month: "Oct 2021", tickets: 6, recruiters: 4 },
    { month: "Nov 2021", tickets: 7, recruiters: 5 },
    { month: "Dec 2021", tickets: 5, recruiters: 3 },
    { month: "Jan 2022", tickets: 8, recruiters: 6 },
    { month: "Feb 2022", tickets: 7, recruiters: 5 },
    { month: "Mar 2022", tickets: 6, recruiters: 4 },
];

const recruiters = [
    {
        id: 1,
        name: "Sarah Lee",
        activeJDs: 5,
        shortlisted: 12,
        closed: 4,
        status: "Active",
    },
    {
        id: 2,
        name: "Sarah Lee",
        activeJDs: 5,
        shortlisted: 12,
        closed: 4,
        status: "Active",
    },
    {
        id: 3,
        name: "Sarah Lee",
        activeJDs: 5,
        shortlisted: 12,
        closed: 4,
        status: "On Leave",
    },
];

const data = [
    { name: 'Software Engineer', value: 120 },
    { name: 'Product Manager', value: 85 },
    { name: 'Data Analyst', value: 65 },
    { name: 'UI/UX Designer', value: 45 },
    { name: 'DevOps Engineer', value: 26 },
];

// Colors for each slice
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// Calculate total
const total = data.reduce((sum, item) => sum + item.value, 0);

export default function RMGDashboard() {
    return (
        <div className="min-h-screen">
            <div className="grid md:grid-cols-[30%_67%] gap-7 mb-6">
                <div className="grid gap-4">
                    <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-gray-600 text-sm font-medium">Total Jobs</h2>
                            <p className="text-2xl font-semibold text-gray-800 mt-1">500+</p>
                            <p className="text-green-500 text-sm mt-1">▲ 8.5% Up from yesterday</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <svg
                                className="w-6 h-6 text-purple-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 2a5 5 0 015 5v1h-1V7a4 4 0 00-8 0v1H5V7a5 5 0 015-5z" />
                                <path
                                    fillRule="evenodd"
                                    d="M4 8a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2H4zm5 3a1 1 0 10-2 0 1 1 0 002 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-gray-600 text-sm font-medium">Total Tickets</h2>
                            <p className="text-2xl font-semibold text-gray-800 mt-1">800+</p>
                            <p className="text-red-500 text-sm mt-1">▼ 4.3% Down from yesterday</p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <svg
                                className="w-6 h-6 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M3 3v14l13-7L3 3z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-2xl p-4 overflow-x-auto">
                    <div className="min-w-[600px] sm:min-w-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={itemApprovalData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="jobs" fill="#3b82f6" name="Total Jobs" />
                                <Bar dataKey="recruiters" fill="#6366f1" name="Recruiters" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>



            <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-2xl p-4 overflow-x-auto">
                <div className="min-w-[600px] sm:min-w-full">
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={rangeData}>
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="active"
                                stroke="#f97316"
                                fill="#fca5a5"
                                fillOpacity={0.6}
                                name="Active Recruiters"
                            />
                            <Area
                                type="monotone"
                                dataKey="assigned"
                                stroke="#a78bfa"
                                fill="#c4b5fd"
                                fillOpacity={0.6}
                                name="Assigned Candidates"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>


            <div className="mt-6 space-y-6">

                <div className="grid grid-cols-1 lg:grid-cols-[67%_30%] gap-7">

                    <div className="bg-white rounded-2xl p-5 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] overflow-x-auto">
                        <h2 className="text-lg font-semibold mb-4">Job Descriptions</h2>
                        <div className="h-72 min-w-[600px]"> {/* ensures graph doesn’t squish */}
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="tickets"
                                        stroke="#22c55e"
                                        strokeWidth={3}
                                        dot={{ r: 5 }}
                                        activeDot={{ r: 7 }}
                                        name="Tickets"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="recruiters"
                                        stroke="#f59e0b"
                                        strokeWidth={3}
                                        dot={{ r: 5 }}
                                        activeDot={{ r: 7 }}
                                        name="Recruiters"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
                            <a href="#" className="text-blue-600 text-sm font-medium">See all</a>
                        </div>

                        <div className="space-y-4 min-w-[400px]">
                            {[
                                { name: "Simmons", role: "UI/UX Designer" },
                                { name: "Jenny Wilson", role: "Angular Developer" },
                                { name: "Devon Lane", role: "Web Designer" },
                            ].map((person, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-300" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{person.name}</p>
                                            <p className="text-sm text-gray-500">{person.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                                        <span>🕒</span>
                                        <span>10:00–12:45</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Current Jobs Open</h2>
                        <a href="#" className="text-blue-600 text-sm font-medium">See all</a>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className="text-gray-500 text-sm">
                                    <th className="px-2 py-2 border border-gray-500 text-slate-600">Job Title</th>
                                    <th className="px-2 py-2 border border-gray-500 text-slate-600">Applications</th>
                                    <th className="px-2 py-2 border border-gray-500 text-slate-600">Date Period</th>
                                    <th className="px-2 py-2 border border-gray-500 text-slate-600">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="rounded-lg">
                                    <td className="px-2 py-2 font-medium border border-gray-500 text-slate-600">
                                        Flutter Developer
                                    </td>
                                    <td className="px-2 py-2 border border-gray-500 text-slate-600">92</td>
                                    <td className="px-2 py-2 border border-gray-500 text-slate-600">Apr 21, 2024</td>
                                    <td className="px-2 py-2 border border-gray-500 text-slate-600">•••</td>
                                </tr>
                                <tr className="rounded-lg">
                                    <td className="px-2 py-2 font-medium border border-gray-500 text-slate-600">
                                        Angular Developer
                                    </td>
                                    <td className="px-2 py-2 border border-gray-500 text-slate-600">84</td>
                                    <td className="px-2 py-2 border border-gray-500 text-slate-600">Dec 21, 2024</td>
                                    <td className="px-2 py-2 border border-gray-500 text-slate-600">•••</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <div className="p-4 bg-gray-50 min-h-screen flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center items-center shadow-md">
                            <img
                                src={img}
                                alt="Laptop icon"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-gray-700 font-semibold mb-4">Popular JDs</h3>
                            <div className="flex justify-center">
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-center text-gray-600 mt-2">{total} Total</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-gray-700 font-semibold">Candidates</h3>
                                <span className="text-sm text-gray-500">Month</span>
                            </div>
                            <h2 className="text-2xl font-semibold mb-3">7,124.80</h2>
                            <div className="flex items-end space-x-4 min-w-[500px]">
                                {[8, 10, 9, 9.5, 8, 7, 3].map((val, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div
                                            className="w-6 bg-gradient-to-t from-purple-600 to-purple-300 rounded-md"
                                            style={{ height: `${val * 20}px` }}
                                        ></div>
                                        <span className="text-xs text-gray-500 mt-1">
                                            {1 + i * 3}Nov
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-gray-700 font-semibold mb-4">JD Status</h3>
                            <h2 className="text-2xl font-semibold mb-4">100</h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-4 mr-3">
                                        <div
                                            className="bg-blue-500 h-4 rounded-full"
                                            style={{ width: "45%" }}
                                        ></div>
                                    </div>
                                    <span className="text-blue-500 font-medium text-sm">45%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-4 mr-3">
                                        <div
                                            className="bg-orange-400 h-4 rounded-full"
                                            style={{ width: "25%" }}
                                        ></div>
                                    </div>
                                    <span className="text-orange-400 font-medium text-sm">25%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-4 mr-3">
                                        <div
                                            className="bg-green-500 h-4 rounded-full"
                                            style={{ width: "35%" }}
                                        ></div>
                                    </div>
                                    <span className="text-green-500 font-medium text-sm">35%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-2xl mt-6">
                <h2 className="text-lg font-semibold p-4">Active Recruiter Table</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 text-sm shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)]">
                                <th className="px-4 py-3 text-left font-medium">Sr.No</th>
                                <th className="px-4 py-3 text-left font-medium">Recruiter Name</th>
                                <th className="px-4 py-3 text-left font-medium">Active JDs</th>
                                <th className="px-4 py-3 text-left font-medium">Candidate Shortlisted</th>
                                <th className="px-4 py-3 text-left font-medium">Closed Position</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recruiters.map((rec) => (
                                <tr
                                    key={rec.id}
                                    className="border-b border-gray-400 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3">{rec.id}.</td>
                                    <td className="px-4 py-3">{rec.name}</td>
                                    <td className="px-4 py-3">{rec.activeJDs}</td>
                                    <td className="px-4 py-3">{rec.shortlisted}</td>
                                    <td className="px-4 py-3">{rec.closed}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${rec.status === "Active"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-orange-100 text-orange-600"
                                                }`}
                                        >
                                            {rec.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center py-3">
                    <a
                        href="#"
                        className="text-blue-600 text-sm hover:underline font-medium"
                    >
                        See all
                    </a>
                </div>
            </div>

        </div>
    );
}
