import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
} from "lucide-react";
import Pagination from "../../components/LandingPage/Pagination";

const SeeHistory = () => {
    const jobData = [
        {
            id: 1,
            title: "UI/UX Designer",
            jdId: "JD#2043",
            assignedOn: "2025-10-02",
            dueDate: "2025-10-25",
            status: "In Progress",
            statusColor: "text-yellow-600",
            priority: "High",
            notes: "Ensure candidate resumes are filtered by portfolio quality and case study review.",
            totalApply: 500,
            filtered: 300,
            unfiltered: 100
        },
        {
            id: 2,
            title: "Frontend Developer",
            jdId: "JD#2044",
            assignedOn: "2025-10-03",
            dueDate: "2025-10-28",
            status: "Completed",
            statusColor: "text-green-600",
            priority: "Medium",
            notes: "Focus on React.js and TypeScript experience. Portfolio review mandatory.",
            totalApply: 350,
            filtered: 250,
            unfiltered: 50
        },
        {
            id: 3,
            title: "Backend Developer",
            jdId: "JD#2045",
            assignedOn: "2025-10-05",
            dueDate: "2025-10-30",
            status: "Pending",
            statusColor: "text-red-600",
            priority: "Low",
            notes: "Node.js and Python expertise required. Check for cloud deployment experience.",
            totalApply: 280,
            filtered: 180,
            unfiltered: 70
        }
    ];

    const filteredCandidates = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: ["Trina Das", "Rahul Sharma", "Priya Patel", "Amit Kumar", "Sneha Gupta"][i % 5],
        email: ["trinadas01@gmail.com", "rahul.sharma@gmail.com", "priya.patel@gmail.com", "amit.kumar@gmail.com", "sneha.gupta@gmail.com"][i % 5],
        skills: ["Wireframe, Prototyping, User Research, others more skills", "React, JavaScript, CSS, HTML, Redux", "Figma, Sketch, Adobe XD, User Testing", "Angular, TypeScript, Material UI", "Vue.js, Sass, Webpack, Git"][i % 5],
        percentage: [79, 85, 72, 88, 91][i % 5]
    }));

    const unfilteredCandidates = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        name: ["John Doe", "Sarah Wilson", "Mike Johnson", "Lisa Brown", "David Lee"][i % 5],
        email: ["johndoe@gmail.com", "sarah.wilson@gmail.com", "mike.j@gmail.com", "lisa.brown@gmail.com", "david.lee@gmail.com"][i % 5],
        skills: ["Basic HTML, CSS knowledge", "Limited JavaScript experience", "Beginner level skills", "Some design knowledge", "Entry level programming"][i % 5],
        percentage: [29, 35, 25, 31, 28][i % 5]
    }));

    const [currentJobIndex, setCurrentJobIndex] = useState(0);
    const [filteredPage, setFilteredPage] = useState(1);
    const [unfilteredPage, setUnfilteredPage] = useState(1);
    
    const itemsPerPage = 4;
    const currentJob = jobData[currentJobIndex];

    const filteredTotalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
    const filteredStartIndex = (filteredPage - 1) * itemsPerPage;
    const filteredEndIndex = filteredStartIndex + itemsPerPage;
    const currentFilteredCandidates = filteredCandidates.slice(filteredStartIndex, filteredEndIndex);

    const unfilteredTotalPages = Math.ceil(unfilteredCandidates.length / itemsPerPage);
    const unfilteredStartIndex = (unfilteredPage - 1) * itemsPerPage;
    const unfilteredEndIndex = unfilteredStartIndex + itemsPerPage;
    const currentUnfilteredCandidates = unfilteredCandidates.slice(unfilteredStartIndex, unfilteredEndIndex);

    const handlePrevious = () => {
        setCurrentJobIndex((prev) => (prev === 0 ? jobData.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentJobIndex((prev) => (prev === jobData.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className="text-gray-800 font-semibold text-lg">
                            Job Title : <span className="font-normal">{currentJob.title}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handlePrevious}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Previous Job"
                        >
                            <ChevronLeft className="w-5 h-5 cursor-pointer text-gray-600" />
                        </button>
                        <span className="text-sm text-gray-500">
                            {currentJobIndex + 1} / {jobData.length}
                        </span>
                        <button 
                            onClick={handleNext}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Next Job"
                        >
                            <ChevronRight className="w-5 h-5 cursor-pointer text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl p-5 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-gray-700">
                                JD ID : <span className="font-medium">{currentJob.jdId}</span>
                            </p>

                            <p className="text-gray-700">
                                Assigned On : <span>{currentJob.assignedOn}</span>
                            </p>

                            <p className="text-gray-700">
                                Due Date : <span>{currentJob.dueDate}</span>
                            </p>

                            <p className="text-gray-700">
                                Documents :
                                <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                                    [Download JD.pdf]
                                </span>{" "}
                                /
                                <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                                    [Candidate List.xlsx]
                                </span>
                            </p>
                        </div>
                        
                        <div>
                            <div className="flex space-x-3.5">
                                <p className="text-gray-700 font-semibold mt-2">Current Status :</p>
                                <p className={`font-semibold mt-2 ${currentJob.statusColor}`}>
                                    {currentJob.status}
                                </p>
                            </div>
                            <div className="flex space-x-3.5">
                                <p className="text-gray-700 font-semibold mt-2">Priority :</p>
                                <p className="text-gray-600 font-semibold mt-2">{currentJob.priority}</p>
                            </div>
                            <p className="text-gray-700 font-semibold mt-2">Notes :</p>
                            <p className="text-gray-600 text-sm leading-tight">
                                "{currentJob.notes}"
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl space-y-4">
                    <h2 className="text-lg font-semibold px-5 pt-4">Candidate</h2>
                    <hr />
                    <div className="px-5 space-y-4 pb-4">
                        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full w-fit">
                            Total Apply : {currentJob.totalApply}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                            <p className="text-gray-700">Filtered Candidate: {currentJob.filtered}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                            <p className="text-gray-700">Unfiltered Candidate: {currentJob.unfiltered}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 rounded-xl space-y-4 bg-white">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-blue-600 rounded-full"></span>
                    <p className="text-gray-800 font-semibold">Filtered Candidate: {currentJob.filtered}</p>
                </div>

                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[900px]">
                            <thead>
                                <tr className="border-b border-gray-400 text-gray-700">
                                    <th className="py-3 px-4">Sl.No</th>
                                    <th className="py-3 px-4">Name</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Job Title</th>
                                    <th className="py-3 px-4">Skills</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentFilteredCandidates.map((candidate, idx) => (
                                    <tr key={candidate.id} className="border-b border-gray-400 text-gray-700">
                                        <td className="py-3 px-4">{filteredStartIndex + idx + 1}.</td>
                                        <td className="py-3 px-4">{candidate.name}</td>
                                        <td className="py-3 px-4">{candidate.email}</td>
                                        <td className="py-3 px-4">{currentJob.title}</td>
                                        <td className="py-3 px-4">{candidate.skills}</td>

                                        <td className="py-3 px-2 flex items-center gap-2">
                                            <div className="w-24 bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${candidate.percentage}%` }}></div>
                                            </div>
                                            <span className="text-blue-600 text-sm">{candidate.percentage}%</span>
                                        </td>

                                        <td className="py-3 px-2">
                                            <button className="p-2 border rounded-lg hover:bg-gray-100">
                                                <Eye className="w-5 h-5 text-blue-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={filteredPage}
                        totalPages={filteredTotalPages}
                        onPageChange={setFilteredPage}
                    />
                </div>
            </div>

            <div className="shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] p-4 rounded-xl space-y-4 bg-white">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-600 rounded-full"></span>
                    <p className="text-gray-800 font-semibold">Unfiltered Candidate: {currentJob.unfiltered}</p>
                </div>

                <div className="bg-white shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.35)] rounded-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[900px]">
                            <thead>
                                <tr className="border-b border-gray-400 text-gray-700">
                                    <th className="py-3 px-4">Sl.No</th>
                                    <th className="py-3 px-4">Name</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Job Title</th>
                                    <th className="py-3 px-4">Skills</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentUnfilteredCandidates.map((candidate, idx) => (
                                    <tr key={candidate.id} className="border-b border-gray-400 text-gray-700">
                                        <td className="py-3 px-4">{unfilteredStartIndex + idx + 1}.</td>
                                        <td className="py-3 px-4">{candidate.name}</td>
                                                                                <td className="py-3 px-4">{candidate.email}</td>
                                        <td className="py-3 px-4">{currentJob.title}</td>
                                        <td className="py-3 px-4">{candidate.skills}</td>

                                        <td className="py-3 px-2 flex items-center gap-2">
                                            <div className="w-24 bg-gray-200 rounded-full h-2">
                                                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${candidate.percentage}%` }}></div>
                                            </div>
                                            <span className="text-red-600 text-sm">{candidate.percentage}%</span>
                                        </td>

                                        <td className="py-3 px-2">
                                            <button className="p-2 border rounded-lg hover:bg-gray-100">
                                                <Eye className="w-5 h-5 text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination 
                        currentPage={unfilteredPage}
                        totalPages={unfilteredTotalPages}
                        onPageChange={setUnfilteredPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default SeeHistory;