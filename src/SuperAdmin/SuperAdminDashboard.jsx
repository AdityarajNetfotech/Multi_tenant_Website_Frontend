import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import img2 from '../assets/SADashImg1.png'
import img1 from '../assets/SADashImg2.png'
import img3 from '../assets/SADashImg3.png'

export default function SuperAdminDashboard() {
    const barData = [
        { name: "Jan", value: 50 },
        { name: "Feb", value: 90 },
        { name: "Mar", value: 60 },
        { name: "Apr", value: 100 },
        { name: "May", value: 45 },
        { name: "Jun", value: 40 },
        { name: "Jul", value: 55 },
        { name: "Aug", value: 50 },
        { name: "Sep", value: 70 },
        { name: "Oct", value: 60 },
        { name: "Nov", value: 55 },
        { name: "Dec", value: 65 },
    ];

    const pieData = [
        { name: "Hired", value: 300, color: "#4ade80" },
        { name: "Rejected", value: 224, color: "#f87171" },
        { name: "Shortlisted", value: 864, color: "#facc15" },
    ];

    const lineData = [
        { name: "Jan", value: 10 },
        { name: "Feb", value: 25 },
        { name: "Mar", value: 50 },
        { name: "Apr", value: 80 },
        { name: "May", value: 40 },
        { name: "Jun", value: 35 },
        { name: "Jul", value: 45 },
        { name: "Aug", value: 60 },
        { name: "Sep", value: 95 },
        { name: "Oct", value: 50 },
        { name: "Nov", value: 40 },
        { name: "Dec", value: 55 },
    ];

    const statsCards = [
        { title: "Applications", value: 2245, change: "+12.50%", color: "bg-yellow-100" },
        { title: "Shortlisted", value: 864, change: "-1.10%", color: "bg-blue-100" },
        { title: "Hired", value: 300, change: "+7.44%", color: "bg-green-100" },
        { title: "Rejected", value: 224, change: "-2.29%", color: "bg-red-100" },
    ];

    const data = Array.from({ length: 14 }, (_, i) => ({
        week: i + 1,
        blue: Math.floor(Math.random() * 80),
        green: Math.floor(Math.random() * 60),
    }));

    return (
        <div className="min-h-screen p-4 overflow-x-hidden"> 
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="w-full">
                        <img
                            src={img1}
                            alt="AI Bot"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-full">
                        <img
                            src={img2}
                            alt="Dashboard Image"
                            className="w-full h-full object-cover rounded-lg" 
                        />
                    </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                    {statsCards.map((item, i) => (
                        <div
                            key={i}
                            className={`rounded-xl shadow-md p-3 sm:p-4 ${item.color} transition-all hover:shadow-lg`}
                        >
                            <h3 className="text-xs sm:text-sm lg:text-base text-gray-700 font-semibold">
                                {item.title}
                            </h3>
                            <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1">
                                {item.value}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                {item.change}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 lg:col-span-7">
                    <h3 className="font-semibold text-lg mb-4">Top Hiring</h3>
                    <div className="h-48 sm:h-56 lg:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ left: 0, right: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    interval={'preserveStartEnd'}
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 lg:col-span-3 flex flex-col items-center justify-center">
                    <h3 className="font-semibold text-lg mb-4">Company Overview</h3>
                    <div className="h-48 sm:h-56 lg:h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ left: 0, right: 0 }}>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius="80%"
                                    innerRadius="50%"
                                    paddingAngle={4}
                                    cx="50%"
                                    cy="50%"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {pieData.map((item, index) => (
                            <div key={index} className="flex items-center gap-1">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-xs sm:text-sm">{item.name}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-base sm:text-lg font-semibold mt-2">444 COMPANY</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 w-full">
                    <h3 className="font-semibold text-lg mb-4">Performance</h3>
                    <div className="h-48 sm:h-56 lg:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData} margin={{ left: 0, right: 0 }}> 
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    interval={'preserveStartEnd'}
                                />
                                <YAxis tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"> 
                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col justify-between">
                    <h2 className="text-gray-800 font-semibold text-lg mb-4">Daily Tests</h2>
                    <div className="flex flex-wrap items-baseline gap-6">
                        <div>
                            <p className="text-4xl font-bold text-blue-600">75.08</p>
                            <p className="text-gray-500 text-sm">Weeks</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-green-600">45.27</p>
                            <p className="text-gray-500 text-sm">Days</p>
                        </div>
                    </div>

                    <div className="mt-6 w-full h-36">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} margin={{ left: 0, right: 0 }}> 
                                <Tooltip cursor={false} />
                                <Bar dataKey="blue" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                                <Bar dataKey="green" fill="#22c55e" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="w-full"> 
                    <img
                        src={img3}
                        alt="AI Robot"
                        className="w-full h-auto object-cover rounded-lg" 
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                        <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 text-center">
                            <p className="text-gray-400 text-sm mb-1">Top month</p>
                            <h3 className="text-lg font-semibold text-orange-600">March</h3>
                            <p className="text-gray-500 text-sm">2025</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 text-center">
                            <p className="text-gray-400 text-sm mb-1">Top year</p>
                            <h3 className="text-lg font-semibold text-gray-800">2025</h3>
                        </div>

                        <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 text-center sm:col-span-2">
                            <p className="text-gray-400 text-sm mb-1">Top Companies</p>
                            <div className="flex justify-center items-center gap-3">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                    alt="Company"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-gray-800 font-medium text-sm sm:text-base"> 
                                    Netfotech Solutions
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}