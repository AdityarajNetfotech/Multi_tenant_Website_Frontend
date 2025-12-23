import { useState } from 'react';
import { Trash2, Search, SlidersHorizontal } from 'lucide-react';
import Pagination from '../../components/LandingPage/Pagination';

function AppliedJD() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const candidatesData = [
        {
            id: '#145798',
            companyName: 'Aakash Singh',
            jobTitle: 'QA Cypress + Java',
            appliedOn: "1/09/2025",
            skills: ['Wireframing', 'Prototyping', 'User Research'],
        },
        {
            id: '#145799',
            companyName: 'Rahul Kumar',
            jobTitle: 'Full Stack Developer',
            appliedOn: "1/09/2025",
            skills: ['React', 'Node', 'SQL'],
        },
        {
            id: '#145800',
            companyName: 'Priya Sharma',
            jobTitle: 'UI/UX Designer',
            appliedOn: "1/09/2025",
            skills: ['Wireframing', 'Visual Design'],
        },
        {
            id: '#145801',
            companyName: 'Vikram Patel',
            jobTitle: 'Backend Developer',
            appliedOn: "1/09/2025",
            skills: ['Node', 'MongoDB', 'API'],
        },
        {
            id: '#145802',
            companyName: 'Neha Gupta',
            jobTitle: 'DevOps Engineer',
            appliedOn: "1/09/2025",
            skills: ['AWS', 'Docker', 'CI/CD'],
        },
        {
            id: '#145803',
            companyName: 'Amit Verma',
            jobTitle: 'Frontend Developer',
            appliedOn: "1/09/2025",
            skills: ['React', 'Tailwind'],
        },
        {
            id: '#145804',
            companyName: 'Sonia Kapoor',
            jobTitle: 'Data Analyst',
            appliedOn: "1/09/2025",
            skills: ['SQL', 'Python'],
        },
    ];

    const filteredCandidates = candidatesData.filter((c) =>
        c.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredCandidates.slice(startIndex, startIndex + itemsPerPage);
    
    return (
        <>
            <div className="bg-white rounded-xl shadow-md border border-gray-300 p-4 md:p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search by Name"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-3 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="absolute right-0 top-0 h-full px-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex w-full sm:w-auto sm:justify-end">
                        <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-black text-white rounded-lg transition-colors hover:bg-gray-800 w-full sm:w-auto">
                            <SlidersHorizontal className="w-5 h-5" />
                            <span className="font-medium text-sm">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto border border-gray-300 shadow-md rounded-2xl">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-300 bg-gray-50">
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Company Name</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Job Title</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Applied On</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Skills</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((candidate, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-sm text-gray-800">{candidate.id}</td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{candidate.companyName}</td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{candidate.jobTitle}</td>
                                        <td className="py-4 px-4 text-sm text-gray-600">{candidate.appliedOn}</td>
                                        <td className="py-4 px-4">
                                            <button className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200">
                                                View
                                            </button>
                                        </td>
                                        <td className="py-4 px-4">
                                            <button className="p-1.5 border border-red-300 rounded hover:bg-red-50" aria-label="Delete">
                                                <Trash2 size={16} className="text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-6 text-center text-gray-500">
                                        No candidates found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(newPage) => {
                                if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default AppliedJD