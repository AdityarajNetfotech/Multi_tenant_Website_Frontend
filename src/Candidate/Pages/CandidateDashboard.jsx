import { Bookmark } from "lucide-react";
import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const candidates = [
    {
        id: 1,
        name: "Rahul Kumar",
        role: "Full Stack Developer",
        progress: 64,
        status: "Pending",
        points: "2.140 Points",
        targetDate: "Until 12 March, 2021",
        color: "bg-pink-200",
    },
    {
        id: 2,
        name: "Arijit Kar",
        role: "UI/UX Designer",
        progress: 50,
        status: "Pending",
        points: "1.839 Points",
        targetDate: "Until 9 March, 2021",
        color: "bg-sky-200",
    },
    {
        id: 3,
        name: "Sneha Sen",
        role: "Data Analytics",
        progress: 80,
        status: "Almost Done",
        points: "4.220 Points",
        targetDate: "Until 12 February, 2021",
        color: "bg-yellow-200",
    },
];

const applications = [
    {
        company: "Techmint",
        role: "Senior Product Designer",
        location: "Bengaluru, India",
        salary: "₹ 50K – ₹ 70K",
        type: "On-Site",
        status: "Rejected",
        color: "bg-red-100 text-red-600",
    },
    {
        company: "Unacademy",
        role: "Senior Product Designer",
        location: "Bengaluru, India",
        salary: "₹ 60K – ₹ 80K",
        type: "Work From Home",
        status: "In Process (70%)",
        color: "bg-yellow-100 text-yellow-700",
    },
    {
        company: "Udemy",
        role: "Senior Product Designer",
        location: "Bengaluru, India",
        salary: "₹ 60K – ₹ 75K",
        type: "On-Site",
        status: "Selected",
        color: "bg-green-100 text-green-700",
    },
];

const jobs = [
    {
        id: 1,
        company: "Avalon Meta",
        location: "Mumbai",
        applicants: 100,
        posted: "3 Weeks Ago",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW4qIERoyjk6oTJte3pRofI1CZWOEFK-0FIQ&s",
    },
    {
        id: 2,
        company: "CRED",
        location: "Bengaluru",
        applicants: 12,
        posted: "1 Week Ago",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW4qIERoyjk6oTJte3pRofI1CZWOEFK-0FIQ&s",
    },
    {
        id: 3,
        company: "Avalon Meta",
        location: "Mumbai",
        applicants: 100,
        posted: "3 Weeks Ago",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW4qIERoyjk6oTJte3pRofI1CZWOEFK-0FIQ&s",
    },
];

const CandidateDashboard = () => {
    const [range, setRange] = useState("1 Day");

    const dataByRange = {
        "1 Day": [80, 70, 65, 50, 45, 40],
        "1 Month": [90, 85, 75, 70, 60, 55],
        "1 Year": [95, 90, 85, 80, 70, 60],
        Max: [100, 95, 85, 75, 65, 60],
    };

    const chartData = dataByRange[range].map((v, i) => ({
        name: `P${i + 1}`,
        value: v,
    }));

    const ranges = ["1 Day", "1 Month", "1 Year", "Max"];

    return (
        <div className="min-h-screen space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">

                <div className="col-span-2 bg-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)]">
                    <div className="absolute inset-0">
                        <div className="w-full h-full bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-2xl"></div>
                    </div>

                    <div className="relative z-10 max-w-md">
                        <p className="text-sm text-gray-600">September 4, 2023</p>
                        <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                            Welcome back, Leena!
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Always stay updated in your candidate portal.
                        </p>
                    </div>

                    <img
                        src="https://media.istockphoto.com/id/530829213/vector/profile-icon-male-avatar-portrait-casual-person.jpg?s=612x612&w=0&k=20&c=uopclRhM84eLK0cPrHbz2hAhgQxUfeTpKDFz6HtZbjM="
                        alt="Character"
                        className="w-40 md:w-52 relative z-10 mt-4 md:mt-0 rounded-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-4">
                        <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-6">
                            <div className="text-gray-600">Total Application</div>
                            <div className="text-3xl font-bold mt-1">7,825</div>
                            <div className="flex items-center mt-2 text-orange-500 font-medium">
                                +22% <span className="ml-2 w-12 h-4 bg-orange-300 rounded-full"></span>
                            </div>
                        </div>

                        <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-6">
                            <div className="text-gray-600">Exam Schedule</div>
                            <div className="text-3xl font-bold mt-1">1200+</div>
                            <div className="flex items-center mt-2 text-red-500 font-medium">
                                -25% <span className="ml-2 w-12 h-4 bg-red-300 rounded-full"></span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-6">
                            <div className="text-gray-600">Already Hired</div>
                            <div className="text-3xl font-bold mt-1">1000+</div>
                            <div className="flex items-center mt-2 text-green-600 font-medium">
                                +49% <span className="ml-2 w-12 h-4 bg-green-300 rounded-full"></span>
                            </div>
                        </div>

                        <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-6">
                            <div className="text-gray-600">Rejected Application</div>
                            <div className="text-3xl font-bold mt-1">200</div>
                            <div className="flex items-center mt-2 text-red-500 font-medium">
                                -25% <span className="ml-2 w-12 h-4 bg-red-300 rounded-full"></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-6 overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Applications</h2>
                        <a href="#" className="text-indigo-600 text-sm font-medium">
                            See all
                        </a>
                    </div>
                    <div className="min-w-[600px]">
                        {applications.map((app, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4 last:border-0 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-2 rounded-2xl"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/5/udemy-icon-3j6wakwfpzle3lk48gsyn.png/udemy-icon-1o4mdttoaqgp1qaghk9f7.png?_a=DATAg1AAZAA0"
                                        alt="Company Logo"
                                        className="w-12 h-12 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-1 rounded-2xl"
                                    />
                                    <div className="">
                                        <h3 className="font-medium text-gray-800">{app.role}</h3>
                                        <p className="text-sm text-gray-500">
                                            {app.company} • {app.type}
                                        </p>
                                        <p className="text-sm text-gray-400">{app.location}</p>
                                    </div>
                                </div>
                                <p className="font-medium">{app.salary}</p>
                                <div className="text-right">
                                    <span
                                        className={`inline-block mt-2 px-2 py-1 text-xs rounded-lg ${app.color}`}
                                    >
                                        {app.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-6 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                        Contributions
                    </h2>
                    <div className="flex space-x-2 mb-6">
                        <button className="bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm">
                            Years
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                            Months
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                            Days
                        </button>
                    </div>
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="#E5E7EB"
                                strokeWidth="10"
                                fill="none"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                stroke="#2563EB"
                                strokeWidth="10"
                                fill="none"
                                strokeDasharray="350"
                                strokeDashoffset="20"
                                strokeLinecap="round"
                                transform="rotate(-90 64 64)"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-2xl font-semibold text-gray-800">99%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-6 w-full overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Candidate's progress
                    </h2>
                    <div className="flex space-x-2">
                        <button className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-sm font-medium">
                            Filter
                        </button>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded-lg text-sm font-medium">
                            + Add
                        </button>
                    </div>
                </div>

                <div className="divide-y min-w-[800px]">
                    <div className="py-3 flex justify-between items-center font-semibold text-gray-700 border-b">
                        <div className="w-1/3">Name & Stages</div>
                        <div className="w-1/3">Progress</div>
                        <div className="w-1/6 text-right">Points</div>
                        <div className="w-1/4 text-right">Target Date</div>
                    </div>

                    {candidates.map((c, i) => (
                        <div key={i} className="py-4 flex justify-between items-center">
                            <div className="flex items-center space-x-4 w-1/3">
                                <div
                                    className={`relative w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-sm font-semibold`}
                                >
                                    <span>{c.id}</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{c.name}</p>
                                    <p className="text-sm text-gray-500">{c.role}</p>
                                </div>
                            </div>

                            <div className="w-1/3">
                                <div className="flex justify-between text-sm text-gray-700 mb-1">
                                    <span>{c.progress}%</span>
                                    <span
                                        className={
                                            c.status === "Almost Done"
                                                ? "text-orange-500 font-medium"
                                                : "text-gray-500"
                                        }
                                    >
                                        {c.status}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-orange-500 h-2 rounded-full"
                                        style={{ width: `${c.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="w-1/6 text-right">
                                <span className="bg-pink-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                                    {c.points}
                                </span>
                            </div>

                            <div className="w-1/4 text-right text-sm text-gray-500">
                                {c.targetDate}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[67%_30%] gap-7 mt-6">

                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 rounded-xl overflow-x-auto">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <h2 className="text-xl font-semibold">
                            Jobs Recommendations for You
                        </h2>
                        <a href="#" className="text-blue-600 hover:underline text-sm">
                            See all
                        </a>
                    </div>

                    <div className="text-sm text-gray-500 mb-5 flex flex-wrap gap-3">
                        <span>🔹 UX Designer</span>
                        <span>💰 ₹50K – ₹75K</span>
                        <span>📍 Mumbai, Bengaluru, Pune</span>
                    </div>

                    <div className="space-y-4 shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 rounded-xl min-w-[500px]">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="flex justify-between items-center border-b pb-3 last:border-none"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={job.logo}
                                        alt="Company Logo"
                                        className="w-12 h-12 p-1 rounded-full shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)]"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-lg">
                                            UX Designer
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {job.company}, {job.location}
                                        </p>
                                        <div className="flex justify-center items-center mt-1 space-x-2">
                                            <p className="text-gray-500 text-sm">
                                                {job.posted}
                                            </p>
                                            <p
                                                className={`text-sm ${job.applicants > 50
                                                    ? "text-red-500"
                                                    : "text-green-600"
                                                    }`}
                                            >
                                                • {job.applicants} Applicants
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button className="border border-green-500 text-green-600 px-4 py-1.5 rounded-full hover:bg-green-50 transition">
                                        Apply Now
                                    </button>
                                    <button className="text-blue-500 hover:text-blue-700">
                                        <Bookmark />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)]">
                    <h3 className="text-md font-semibold mb-4 text-gray-700">
                        Jobs Description
                    </h3>

                    <div className="w-full h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <XAxis dataKey="name" hide />
                                <YAxis hide />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-center gap-3 mt-3">
                        {ranges.map((r) => (
                            <button
                                key={r}
                                onClick={() => setRange(r)}
                                className={`text-sm px-3 py-1 rounded-md ${range === r
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CandidateDashboard;