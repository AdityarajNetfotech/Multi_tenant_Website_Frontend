import React, { useEffect, useState } from "react";
import {
    FileText,
    Filter,
    Users,
    Download,
    Eye,
    Trash2,
    Code, PenTool, Megaphone, Palette, Layers
} from "lucide-react";
import Pagination from "../components/LandingPage/Pagination";
import axios from "axios";

export default function RecruiterDashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [offersPage, setOffersPage] = useState(1);
    const offersPerPage = 5;
    const totalPages = 9;
    const itemsPerPage = 5;

    const [totalOffers, setTotalOffers] = useState(0);
    const [offersMonthWise, setOffersMonthWise] = useState([]);
    const [ticketsMonthWise, setTicketsMonthWise] = useState([]);
    const [currentOffers, setCurrentOffers] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [jdStatusPercentage, setJdStatusPercentage] = useState({
        closed: 0,
        inProgress: 0,
        jdCreated: 0,
        jdPending: 0,
        open: 0
    });
    const [recruitersData, setRecruitersData] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const token = localStorage.getItem("token");

                const [
                    offersRes,
                    jobsRecRes,
                    hrTicketsRes,
                    currentOffersRes,
                    recentJobsRes,
                    jdStatusPercentageRes,
                    recruitersClosedRes
                ] = await Promise.all([
                    axios.get('http://localhost:4000/api/dashboard/total-offers', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:4000/api/dashboard/jobs-recruiters-month-wise', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:4000/api/dashboard/count-hr-tickets-month-wise', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:4000/api/dashboard/current-offers', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:4000/api/dashboard/recent-jobs', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:4000/api/dashboard/jd-status-percentage', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:4000/api/dashboard/getAll-recruiters-closed', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                ]);

                if (offersRes.data.success) {
                    setTotalOffers(offersRes.data.totalOffers);
                }

                if (jobsRecRes.data.success) {
                    setOffersMonthWise(jobsRecRes.data.offersMonthWise);
                }

                if (hrTicketsRes.data.success) {
                    setTicketsMonthWise(hrTicketsRes.data.totalTicketsMonthWise);
                }

                if (currentOffersRes.data.success) {
                    setCurrentOffers(currentOffersRes.data.offers);
                }

                if (recentJobsRes.data.success) {
                    setRecentJobs(recentJobsRes.data.recentJobs);
                    setTotalJobs(recentJobsRes.data.totalJobs);
                }

                if (jdStatusPercentageRes.data.success) {
                    setJdStatusPercentage(jdStatusPercentageRes.data.jdStatusPercentage);
                }

                if (recruitersClosedRes.data.success) {
                    setRecruitersData(recruitersClosedRes.data.recruiterData);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchAllData();
    }, []);

    const getMonthName = (monthNumber) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[monthNumber - 1] || 'Unknown';
    };

    const totalTickets = ticketsMonthWise.reduce((sum, item) => sum + item.count, 0);

   

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const offersStartIndex = (offersPage - 1) * offersPerPage;
    const offersEndIndex = offersStartIndex + offersPerPage;
    const paginatedOffers = currentOffers.slice(offersStartIndex, offersEndIndex);
    const totalOffersPages = Math.ceil(currentOffers.length / offersPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOffersPageChange = (page) => {
        setOffersPage(page);
    };

    return (
        <div className="">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="col-span-2 bg-white p-6 rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Dashboard Overview
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
                                    <p className="text-2xl font-bold text-gray-900">{totalOffers}</p>
                                    <p className="text-gray-600 text-sm">Total Offers</p>
                                    <p className="text-pink-500 text-xs mt-1">
                                        Current offers
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
                                    <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
                                    <p className="text-gray-600 text-sm">Total Jobs</p>
                                    <p className="text-blue-500 text-xs mt-1">
                                        All job postings
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
                                    <p className="text-2xl font-bold text-gray-900">{totalTickets}</p>
                                    <p className="text-gray-600 text-sm">Total Tickets</p>
                                    <p className="text-lime-600 text-xs mt-1">
                                        All tickets
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
                                strokeDasharray={`${jdStatusPercentage.closed}, ${100 - jdStatusPercentage.closed}`}
                            />
                            <path
                                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3.5"
                                strokeDasharray={`${jdStatusPercentage.inProgress}, ${100 - jdStatusPercentage.inProgress}`}
                            />
                            <path
                                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831"
                                fill="none"
                                stroke="#84cc16"
                                strokeWidth="3.5"
                                strokeDasharray={`${jdStatusPercentage.jdCreated}, ${100 - jdStatusPercentage.jdCreated}`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-gray-500 text-sm">Total Count</p>
                            <p className="text-3xl font-bold text-gray-900">{totalOffers}</p>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Closed ({jdStatusPercentage.closed}%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>In Progress ({jdStatusPercentage.inProgress}%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                            <span>Created ({jdStatusPercentage.jdCreated}%)</span>
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
                            Total Jobs <span className="text-gray-600 block">{totalJobs}</span>
                        </p>
                        <p className="text-green-600">
                            Total Offers <span className="text-gray-600 block">{totalOffers}</span>
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
                                <span className="text-green-500 font-medium">+{jdStatusPercentage.jdCreated}%</span> JD Created
                                <br />
                                <span className="text-red-500 font-medium">-{jdStatusPercentage.closed}%</span> Closed
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
                            <p className="text-gray-500">Status Overview</p>
                            <p className="text-gray-700 font-medium">{totalOffers} Offers</p>
                        </div>
                        <div className="flex gap-1 mt-2">
                            <div className="w-4 h-12 bg-pink-400 rounded-md" style={{ height: `${jdStatusPercentage.closed * 1.5}px` }}></div>
                            <div className="w-4 h-8 bg-blue-400 rounded-md" style={{ height: `${jdStatusPercentage.inProgress * 1.5}px` }}></div>
                            <div className="w-4 h-10 bg-lime-400 rounded-md" style={{ height: `${jdStatusPercentage.jdCreated * 1.5}px` }}></div>
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
                        <h2 className="text-lg font-semibold mb-4">Recent Jobs</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                            {recentJobs.length > 0 ? recentJobs.slice(0, 4).map((job, i) => {
                                const colors = [
                                    { color: "bg-yellow-50", text: "text-yellow-600" },
                                    { color: "bg-blue-50", text: "text-blue-600" },
                                    { color: "bg-green-50", text: "text-green-600" },
                                    { color: "bg-pink-50", text: "text-pink-600" },
                                ];
                                const colorSet = colors[i % 4];
                                return (
                                    <div
                                        key={i}
                                        className={`${colorSet.color} rounded-xl p-4 flex flex-col justify-between`}
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className={`font-semibold ${colorSet.text}`}>{job.jobTitle}</h4>
                                        </div>
                                        <p className="text-gray-500 text-sm">{job.positionAvailable} positions</p>
                                        <button className="text-blue-600 text-sm mt-2">View More →</button>
                                    </div>
                                );
                            }) : (
                                [
                                    { title: "UI/UX Designer", color: "bg-yellow-50", text: "text-yellow-600" },
                                    { title: "Full Stack Developer", color: "bg-blue-50", text: "text-blue-600" },
                                    { title: "Data Analyst", color: "bg-green-50", text: "text-green-600" },
                                    { title: "Graphic Design", color: "bg-pink-50", text: "text-pink-600" },
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
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] mt-6 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Current Offers Details</h2>
                        <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100">
                            <Download size={16} />
                            Export
                        </button>
                    </div>

                    <div className="overflow-x-auto p-1">
                        <table className="w-full text-sm shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-2xl min-w-[900px]">
                            <thead className="bg-gray-100 border-b border-gray-300">
                                <tr className="text-left text-gray-700">
                                    <th className="px-3 py-2">S.No</th>
                                    <th className="px-3 py-2">Job Title</th>
                                    <th className="px-3 py-2">Company</th>
                                    <th className="px-3 py-2">Location</th>
                                    <th className="px-3 py-2">Employment Type</th>
                                    <th className="px-3 py-2">Positions</th>
                                    <th className="px-3 py-2">Experience</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Priority</th>
                                    <th className="px-3 py-2">Created Date</th>
                                    <th className="px-3 py-2">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedOffers.length > 0 ? paginatedOffers.map((offer, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 border-b border-gray-300 last:border-0"
                                    >
                                        <td className="px-3 py-3">{offersStartIndex + i + 1}</td>
                                        <td className="px-3 py-3 whitespace-nowrap font-medium">{offer.jobTitle || 'N/A'}</td>
                                        <td className="px-3 py-3 whitespace-nowrap">{offer.companyName || 'N/A'}</td>
                                        <td className="px-3 py-3 whitespace-nowrap">{offer.city}, {offer.state}</td>
                                        <td className="px-3 py-3 whitespace-nowrap">{offer.employmentType || 'N/A'}</td>
                                        <td className="px-3 py-3">{offer.positionAvailable || 0}</td>
                                        <td className="px-3 py-3">{offer.experience || 'N/A'}</td>
                                        <td className="px-3 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${offer.status === 'JD created' ? 'bg-green-100 text-green-600' :
                                                    offer.status === 'Open' ? 'bg-blue-100 text-blue-600' :
                                                        offer.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' :
                                                            offer.status === 'Closed' ? 'bg-red-100 text-red-600' :
                                                                'bg-gray-100 text-gray-600'
                                                }`}>
                                                {offer.status || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${offer.priority === 'High' ? 'bg-red-100 text-red-600' :
                                                    offer.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                                        'bg-green-100 text-green-600'
                                                }`}>
                                                {offer.priority || 'Low'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 whitespace-nowrap">
                                            {offer.createdAt ? new Date(offer.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
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
                                )) : (
                                    <tr>
                                        <td colSpan="11" className="px-3 py-6 text-center text-gray-500">
                                            No current offers available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {currentOffers.length > offersPerPage && (
                        <Pagination
                            currentPage={offersPage}
                            totalPages={totalOffersPages}
                            onPageChange={handleOffersPageChange}
                        />
                    )}
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col justify-center items-center">
                        <h3 className="text-sm text-gray-500 mb-1">RIGHT NOW</h3>
                        <h1 className="text-3xl font-bold text-orange-600">{totalOffers}</h1>
                        <p className="text-sm text-gray-500">Total Offers</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col justify-center text-center">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Check out about our Company</h3>
                        <button className="bg-orange-500 text-white rounded-lg px-4 py-2 mt-2 hover:bg-orange-600">
                            Check This Out
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-6 flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 mb-4">
                            <div className="absolute inset-0 rounded-full border-8 border-orange-500 border-t-gray-200"></div>
                            <div className="absolute inset-0 flex items-center justify-center font-semibold text-xl">
                                {jdStatusPercentage.jdCreated}%
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">Monthly</p>
                        <div className="w-full h-16 bg-gray-50 flex items-end gap-1 px-2">
                            {offersMonthWise.length > 0 ? offersMonthWise.map((item, i) => (
                                <div
                                    key={i}
                                    className={`w-1 flex-shrink-0 rounded-t-full ${i === offersMonthWise.length - 1 ? "bg-orange-500 h-12" : "bg-gray-300 h-6"
                                        }`}
                                    style={{ height: `${Math.min(item.count * 10, 48)}px` }}
                                ></div>
                            )) : Array(15).fill(0).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 flex-shrink-0 rounded-t-full ${i === 7 ? "bg-orange-500 h-12" : "bg-gray-300 h-6"
                                        }`}
                                ></div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            {offersMonthWise.length > 0 ? getMonthName(offersMonthWise[offersMonthWise.length - 1]?.month) : 'August'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}