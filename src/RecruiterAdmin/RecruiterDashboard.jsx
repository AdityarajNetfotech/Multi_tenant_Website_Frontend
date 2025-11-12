import React, { useState } from "react";
import {
    FileText,
    Filter,
    Users,
    Download,
    Eye,
    Trash2,
    Code, PenTool, Megaphone, Palette, Database, Layers, Monitor
} from "lucide-react";
import Pagination from "../components/LandingPage/Pagination";

export default function RecruiterDashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 9; 
    const itemsPerPage = 5; 

    const candidatesData = Array(45).fill(0).map((_, i) => ({
        id: `#${145756 + i}`,
        company: "Netfotech Solution",
        jobTitle: "QA Cypress + Java",
        filtered: 24,
        unfiltered: 44
    }));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCandidates = candidatesData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-2 bg-white p-6 rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Today's Candidates
                        </h2>
                        <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100">
                            <Download size={16} />
                            Export
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                        <div className="bg-pink-100 p-5 rounded-xl">
                            <div className="bg-pink-500/20 py-3 rounded-lg w-[50px]">
                                <Users className="mx-auto text-pink-600" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">78,421</p>
                                    <p className="text-gray-600 text-sm">Total Candidates</p>
                                    <p className="text-pink-500 text-xs mt-1">
                                        +8% from yesterday
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-100 p-5 rounded-xl">
                            <div className="bg-blue-500/20 p-3 rounded-lg w-[50px]">
                                <FileText className="text-blue-600" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">1,547</p>
                                    <p className="text-gray-600 text-sm">Total Unfiltered</p>
                                    <p className="text-blue-500 text-xs mt-1">
                                        +5% from yesterday
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-lime-100 p-5 rounded-xl">
                            <div className="bg-lime-500/20 p-3 rounded-lg w-[50px]">
                                <Filter className="text-lime-600" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">45,879</p>
                                    <p className="text-gray-600 text-sm">Total Filtered</p>
                                    <p className="text-lime-600 text-xs mt-1">
                                        +1.2% from yesterday
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col items-center justify-center">
                    <div className="relative w-52 h-52">
                        <svg viewBox="0 0 36 36" className="w-full h-full">
                            <path
                                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="3.5"
                                strokeDasharray="60,40"
                            />
                            <path
                                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3.5"
                                strokeDasharray="25,75"
                            />
                            <path
                                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831"
                                fill="none"
                                stroke="#84cc16"
                                strokeWidth="3.5"
                                strokeDasharray="15,85"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-gray-500 text-sm">Total Count</p>
                            <p className="text-3xl font-bold text-gray-900">748K</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Job Descriptions
                    </h2>
                    <div className="h-40 bg-gradient-to-t from-blue-50 to-green-50 rounded-lg relative">
                        <svg
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none"
                            className="absolute inset-0 w-full h-full"
                        >
                            <path
                                d="M0,25 C20,35 40,20 60,30 80,40 100,20 100,20"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2"
                            />
                            <path
                                d="M0,30 C20,20 40,35 60,25 80,30 100,35 100,35"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    <div className="flex justify-between text-sm mt-3">
                        <p className="text-blue-600">
                            Last Month <span className="text-gray-600 block">$3,004</span>
                        </p>
                        <p className="text-green-600">
                            This Month <span className="text-gray-600 block">$4,504</span>
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Statistics</h2>
                        <div className="text-sm text-gray-600">
                            <p>
                                Weekly
                                <br />
                                <span className="text-green-500 font-medium">+72.0%</span> this
                                week
                                <br />
                                <span className="text-red-500 font-medium">-60.0%</span> last
                                week
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 mt-6 relative">
                        <svg
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none"
                            className="absolute inset-0 w-full h-full"
                        >
                            <path
                                d="M0,30 C10,25 30,35 50,20 70,25 90,15 100,30"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between text-sm">
                            <p className="text-gray-500">Activity</p>
                            <p className="text-gray-700 font-medium">14h 15m</p>
                        </div>
                        <div className="flex gap-1 mt-2">
                            <div className="w-4 h-12 bg-pink-400 rounded-md"></div>
                            <div className="w-4 h-8 bg-blue-400 rounded-md"></div>
                            <div className="w-4 h-10 bg-lime-400 rounded-md"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] lg:col-span-2 flex justify-center items-center">
                        <div className="flex flex-col md:flex-row items-start gap-8 max-w-5xl w-full">
                            <div className="space-y-4 w-full md:w-auto">
                                <h2 className="text-lg font-semibold mb-4">Category</h2>

                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <Code size={20} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Developer</h3>
                                        <p className="text-gray-500 text-sm">11 Community</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <PenTool size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Designer</h3>
                                        <p className="text-gray-500 text-sm">24 Community</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <Megaphone size={20} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Marketing</h3>
                                        <p className="text-gray-500 text-sm">18 Community</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-3 w-full">
                                <h3 className="text-sm mb-2">All Criteria</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        {
                                            title: "UI/UX Designer",
                                            desc: "There are more than 100 participants",
                                            icon: <Palette size={18} className="text-purple-600" />,
                                            bg: "bg-purple-100",
                                        },
                                        {
                                            title: "Visual Designer",
                                            desc: "All categories of food for you",
                                            icon: <PenTool size={18} className="text-green-600" />,
                                            bg: "bg-green-100",
                                        },
                                        {
                                            title: "Graphic Designer",
                                            desc: "There are more than 100 participants",
                                            icon: <Layers size={18} className="text-orange-600" />,
                                            bg: "bg-orange-100",
                                        },
                                        {
                                            title: "Brand Designer",
                                            desc: "All categories of food for you",
                                            icon: <Megaphone size={18} className="text-blue-600" />,
                                            bg: "bg-blue-100",
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="border border-gray-500 rounded-xl p-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3"
                                        >
                                            <div className={`${item.bg} p-2 rounded-md flex-shrink-0`}>{item.icon}</div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">{item.title}</h4>
                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-blue-600 font-medium cursor-pointer">
                                    View More Category →
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] flex flex-col">
                        <h2 className="text-lg font-semibold mb-4">New Candidates</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                            {[
                                {
                                    title: "UI/UX Designer",
                                    color: "bg-yellow-50",
                                    text: "text-yellow-600",
                                },
                                {
                                    title: "Full Stack Developer",
                                    color: "bg-blue-50",
                                    text: "text-blue-600",
                                },
                                {
                                    title: "Data Analyst",
                                    color: "bg-green-50",
                                    text: "text-green-600",
                                },
                                {
                                    title: "Graphic Design",
                                    color: "bg-pink-50",
                                    text: "text-pink-600",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`${item.color} rounded-xl p-4 flex flex-col justify-between`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className={`font-semibold ${item.text}`}>{item.title}</h4>
                                    </div>
                                    <p className="text-gray-500 text-sm">20 • +12% New Candidate</p>
                                    <button className="text-blue-600 text-sm mt-2">View More →</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] mt-6 p-6">
                    <h2 className="text-lg font-semibold mb-4">Candidates</h2>

                    <div className="overflow-x-auto p-1">
                        <table className="w-full text-sm shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-2xl min-w-[600px]">
                            <thead className="bg-gray-100 border-b border-gray-300">
                                <tr className="text-left text-gray-700">
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Company</th>
                                    <th className="px-3 py-2">Job Title</th>
                                    <th className="px-3 py-2">Skills</th>
                                    <th className="px-3 py-2">Filtered</th>
                                    <th className="px-3 py-2">Unfiltered</th>
                                    <th className="px-3 py-2">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentCandidates.map((candidate, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 border-b border-gray-300 last:border-0"
                                    >
                                        <td className="px-3 py-3 whitespace-nowrap">{candidate.id}</td>
                                        <td className="px-3 py-3 whitespace-nowrap">{candidate.company}</td>
                                        <td className="px-3 py-3 whitespace-nowrap">{candidate.jobTitle}</td>
                                        <td className="px-3 py-3">
                                            <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-xl text-xs">
                                                View
                                            </button>
                                        </td>
                                        <td className="px-3 py-3">{candidate.filtered}</td>
                                        <td className="px-3 py-3">{candidate.unfiltered}</td>
                                        <td className="px-3 py-3">
                                            <div className="flex gap-2">
                                                <div className="p-1 rounded-sm border border-blue-400">
                                                    <Eye size={16} className="text-blue-600 cursor-pointer" />
                                                </div>
                                                <div className="p-1 rounded-sm border-blue-400 border">
                                                    <Trash2 size={16} className="text-red-500 cursor-pointer" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-2xl  shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col justify-center items-center">
                        <h3 className="text-sm text-gray-500 mb-1">RIGHT NOW</h3>
                        <h1 className="text-3xl font-bold text-orange-600">8,874</h1>
                        <p className="text-sm text-gray-500">Active</p>
                    </div>

                    <div className="bg-white rounded-2xl  shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col justify-center text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Check out about our Company</h3>
                        <button className="bg-orange-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-orange-600">
                            Check This Out
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl  shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 mb-4">
                            <div className="absolute inset-0 rounded-full border-8 border-orange-500 border-t-gray-200"></div>
                            <div className="absolute inset-0 flex items-center justify-center font-semibold text-xl">
                                60%
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">Monthly</p>
                        <div className="w-full h-16 bg-gray-50 flex items-end gap-1 px-2">
                            {Array(15).fill(0).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 flex-shrink-0 rounded-t-full ${i === 7 ? "bg-orange-500 h-12" : "bg-gray-300 h-6"
                                        }`}
                                ></div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">August</p>
                    </div>
                </div>
            </div>
        </div>
    );
}