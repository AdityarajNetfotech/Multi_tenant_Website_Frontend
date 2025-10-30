import React, { useState } from 'react';
import { Search, SlidersHorizontal, Edit, Eye, Trash2 } from 'lucide-react';
import Pagination from '../../components/LandingPage/Pagination';
import RequirementAddNote from './RequirementAddNote';

export default function AssignedRecruiters() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddNote, setShowAddNote] = useState(false);
    const jobsPerPage = 5;

    const jobs = [
        { id: 1, jobId: '#225248', title: 'UI/UX Designer', deadline: '1/09/2025', status: 'Closed', assignedTo: "Ishan Ghosh" },
        { id: 2, jobId: '#225249', title: 'Frontend Developer', deadline: '5/09/2025', status: 'Open', assignedTo: "Ishan Ghosh" },
        { id: 3, jobId: '#225250', title: 'Backend Engineer', deadline: '10/09/2025', status: 'Expired', assignedTo: "Ishan Ghosh" },
        { id: 4, jobId: '#225251', title: 'Project Manager', deadline: '12/09/2025', status: 'Open', assignedTo: "Ishan Ghosh" },
        { id: 5, jobId: '#225252', title: 'QA Tester', deadline: '15/09/2025', status: 'Closed', assignedTo: "Ishan Ghosh" },
        { id: 6, jobId: '#225251', title: 'Project Manager', deadline: '12/09/2025', status: 'Open', assignedTo: "Ishan Ghosh" },
        { id: 7, jobId: '#225252', title: 'QA Tester', deadline: '15/09/2025', status: 'Closed', assignedTo: "Ishan Ghosh" },
    ];

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Closed': return 'bg-yellow-100 text-yellow-700';
            case 'Open': return 'bg-green-100 text-green-700';
            case 'Expired': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto rounded-2xl border border-gray-300 shadow-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
                        <div className="relative w-[260px] sm:w-[280px]">
                            <input
                                type="text"
                                placeholder="Search by Job Title"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors">
                                <Search size={18} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <span className="text-sm text-gray-700">Closed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm text-gray-700">Open</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-sm text-gray-700">Expired</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                        <button className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                            Create
                        </button>
                        <button className="px-6 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                            <SlidersHorizontal size={18} />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-300 shadow-lg">
                    <table className="min-w-[1200px] w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 w-[60px]">Sl.No</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 w-[140px]">ID</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 w-[200px]">Job Title</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 w-[160px]">Deadline</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 w-[160px]">Status</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 w-[160px]">Assigned To</th>
                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 w-[400px]">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentJobs.map((job, index) => (
                                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 text-sm text-gray-700">{startIndex + index + 1}.</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{job.jobId}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{job.title}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{job.deadline}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                     <td className="py-4 px-6 text-sm text-gray-700">{job.assignedTo}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
                                            <button className="px-3 py-1.5 border border-purple-300 text-purple-600 rounded text-sm hover:bg-purple-50 transition-colors whitespace-nowrap">
                                                Task assign ▼
                                            </button>
                                            <button className="p-2 border border-green-300 text-green-600 rounded hover:bg-green-50 transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition-colors">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                               <button
                        onClick={() => setShowAddNote(true)} 
                        className="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors whitespace-nowrap"
                      >
                        Add Note
                      </button>
                                            <button className="px-3 py-1.5 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors whitespace-nowrap">
                                                See History
                                            </button>
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

                {showAddNote && <RequirementAddNote onClose={() => setShowAddNote(false)} />}
            </div>
        </div>
    );
}
