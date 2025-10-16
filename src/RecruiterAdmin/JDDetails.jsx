import { useState } from "react";
import { Upload, FileText, Copy, Eye, Trash2, Filter, Search, Trash } from "lucide-react";
import Pagination from "../components/LandingPage/Pagination";
import ResumeSummary from "./ResumeSummary";
import { useNavigate } from "react-router-dom";

function JDDetails() {
      const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [showResumeSummary, setShowResumeSummary] = useState(false);

    const [currentPageTable1, setCurrentPageTable1] = useState(1);
    const itemsPerPageTable1 = 5;

    const [currentPageTable2, setCurrentPageTable2] = useState(1);
    const itemsPerPageTable2 = 5;

    const candidatesData = [
        {
            id: "#145798",
            name: "Aakash Singh",
            email: "aakashsingh@gmail.com",
            company: "Nerthwork Solution",
            jobTitle: "QA Cypress + Java",
            createdOn: "12/01/2025",
            skills: "View",
            filtered: 24,
            unfiltered: 44,
            isFiltered: true,
            experience: "5+ Years",
        },
        {
            id: "#145799",
            name: "Rahul Kumar",
            email: "rahulkumar@gmail.com",
            company: "Tech Solutions",
            jobTitle: "Full Stack Developer",
            createdOn: "11/01/2025",
            skills: "View",
            filtered: 30,
            unfiltered: 50,
            isFiltered: true,
            experience: "3+ Years",
        },
        {
            id: "#145800",
            name: "Priya Sharma",
            email: "priyasharma@gmail.com",
            company: "Digital Innovations",
            jobTitle: "UI/UX Designer",
            createdOn: "10/01/2025",
            skills: "View",
            filtered: 20,
            unfiltered: 35,
            isFiltered: false,
            experience: "4+ Years",
        },
        {
            id: "#145801",
            name: "Vikram Patel",
            email: "vikrampatel@gmail.com",
            company: "Nerthwork Solution",
            jobTitle: "Backend Developer",
            createdOn: "12/01/2025",
            skills: "View",
            filtered: 24,
            unfiltered: 44,
            isFiltered: false,
            experience: "2+ Years",
        },
        {
            id: "#145802",
            name: "Neha Gupta",
            email: "nehagupta@gmail.com",
            company: "Tech Corp",
            jobTitle: "DevOps Engineer",
            createdOn: "10/05/2025",
            skills: "View",
            filtered: 24,
            unfiltered: 44,
            isFiltered: false,
            experience: "6+ Years",
        },
        {
            id: "#145803",
            name: "Amit Verma",
            email: "amitverma@gmail.com",
            company: "Solutions Inc",
            jobTitle: "Frontend Developer",
            createdOn: "10/05/2025",
            skills: "View",
            filtered: 24,
            unfiltered: 44,
            isFiltered: true,
            experience: "4+ Years",
        },
        {
            id: "#145804",
            name: "Sonia Kapoor",
            email: "soniakapoor@gmail.com",
            company: "Digital Tech",
            jobTitle: "Data Analyst",
            createdOn: "10/05/2025",
            skills: "View",
            filtered: 24,
            unfiltered: 44,
            isFiltered: true,
            experience: "3+ Years",
        },
    ];

    const getFilteredData = () => {
        let data = candidatesData;

        if (activeTab === "filtered") {
            data = data.filter(candidate => candidate.isFiltered === true);
        } else if (activeTab === "unfiltered") {
            data = data.filter(candidate => candidate.isFiltered === false);
        }

        if (searchTerm) {
            data = data.filter(candidate =>
                candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return data;
    };

    const filteredCandidates = getFilteredData();

    const filteredCount = candidatesData.filter(c => c.isFiltered === true).length;
    const unfilteredCount = candidatesData.filter(c => c.isFiltered === false).length;

    const totalPagesTable1 = Math.ceil(candidatesData.length / itemsPerPageTable1);
    const startIndexTable1 = (currentPageTable1 - 1) * itemsPerPageTable1;
    const endIndexTable1 = startIndexTable1 + itemsPerPageTable1;
    const currentDataTable1 = candidatesData.slice(startIndexTable1, endIndexTable1);

    const totalPagesTable2 = Math.ceil(filteredCandidates.length / itemsPerPageTable2);
    const startIndexTable2 = (currentPageTable2 - 1) * itemsPerPageTable2;
    const endIndexTable2 = startIndexTable2 + itemsPerPageTable2;
    const currentDataTable2 = filteredCandidates.slice(startIndexTable2, endIndexTable2);

    const handlePageChangeTable1 = (newPage) => {
        if (newPage >= 1 && newPage <= totalPagesTable1) {
            setCurrentPageTable1(newPage);
        }
    };

    const handlePageChangeTable2 = (newPage) => {
        if (newPage >= 1 && newPage <= totalPagesTable2) {
            setCurrentPageTable2(newPage);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPageTable2(1);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPageTable2(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    JD Details Page
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 border border-gray-200 p-4 rounded-2xl shadow-md">
                    <div className="bg-white rounded-xl p-6 flex shadow-md border border-gray-200 flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold text-purple-600 mb-3">
                            Upload Resume
                        </h3>

                        <label className="w-full flex flex-col items-center justify-center cursor-pointer">
                            <div className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                                <Upload size={20} />
                                Upload Resume
                            </div>
                            <input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                id="resumeUpload"
                                onChange={(e) => {
                                    console.log(e.target.files);
                                }}
                            />
                        </label>

                        <p className="text-xs text-gray-500 mt-3 text-center">
                            You can only upload 20 resumes at a time!
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                            <FileText className="text-blue-500" size={24} />
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{filteredCount}</p>
                        <p className="text-sm text-blue-600">Filtered Resume</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                            <FileText className="text-red-500" size={24} />
                        </div>
                        <p className="text-3xl font-bold text-gray-800 mb-1">{unfilteredCount}</p>
                        <p className="text-sm text-red-600">Unfiltered Resume</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-4 md:p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Candidates</h2>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                            <Filter size={18} />
                            Filter
                        </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 shadow-md rounded-2xl">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-300">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        ID
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Company
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Job Title
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Created On
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Skills
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Filtered
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Unfiltered
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentDataTable1.map((candidate, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-300 hover:bg-gray-50"
                                    >
                                        <td className="py-4 px-4 text-sm text-gray-800">
                                            {candidate.id}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            {candidate.company}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            {candidate.jobTitle}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-gray-600">
                                            {candidate.createdOn}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                                                {candidate.skills}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-sm text-blue-600 font-medium">
                                            {candidate.filtered}
                                        </td>
                                        <td className="py-4 px-4 text-sm text-blue-600 font-medium">
                                            {candidate.unfiltered}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button className="p-1.5 border border-blue-300 rounded hover:bg-blue-50">
                                                    <Eye size={16} className="text-blue-500" />
                                                </button>
                                                <button className="p-1.5 border border-red-300 rounded hover:bg-red-50">
                                                    <Trash2 size={16} className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPageTable1}
                            totalPages={totalPagesTable1}
                            onPageChange={handlePageChangeTable1}
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 shadow-md rounded-2xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mx-6 my-3">
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleTabChange("all")}
                                    className={`pb-2 font-medium transition-all relative ${activeTab === "all"
                                        ? "text-gray-900"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    All ({candidatesData.length})
                                    {activeTab === "all" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleTabChange("filtered")}
                                    className={`pb-2 font-medium transition-all relative flex items-center gap-2 ${activeTab === "filtered"
                                        ? "text-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    Filtered ({filteredCount})
                                    {activeTab === "filtered" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleTabChange("unfiltered")}
                                    className={`pb-2 font-medium transition-all relative flex items-center gap-2 ${activeTab === "unfiltered"
                                        ? "text-red-600"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                    Unfiltered ({unfilteredCount})
                                    {activeTab === "unfiltered" && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by Candidate Name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full sm:w-64 pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-md">
                                    <Search size={16} className="text-white" />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="overflow-x-auto border border-gray-300 shadow-md">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-[#D9D9D94A]">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Candidate Name
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Email
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Skills
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Experience
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentDataTable2.length > 0 ? (
                                    currentDataTable2.map((candidate, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-gray-300 hover:bg-gray-50"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${candidate.isFiltered
                                                            ? "bg-blue-500"
                                                            : "bg-red-500"
                                                            }`}
                                                    ></div>
                                                    <span className="text-sm text-gray-800">
                                                        {candidate.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-gray-600">
                                                {candidate.email}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                                    View
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-sm text-blue-600">
                                                {candidate.experience}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${candidate.isFiltered
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}>
                                                    {candidate.isFiltered ? "Filtered" : "Unfiltered"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            console.log("Eye button clicked");
                                                            setShowResumeSummary(true);
                                                        }}
                                                        className="p-1.5 border border-blue-300 rounded hover:bg-blue-50"
                                                    >
                                                        <Eye size={16} className="text-blue-500" />
                                                    </button>
                                                    <button className="p-1.5 border border-red-300 rounded hover:bg-red-50">
                                                        <Trash2 size={16} className="text-red-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">
                                            No candidates found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {currentDataTable2.length > 0 && (
                            <Pagination
                                currentPage={currentPageTable2}
                                totalPages={totalPagesTable2}
                                onPageChange={handlePageChangeTable2}
                            />
                        )}
                    </div>

                    <div className="my-6 flex justify-center">
                        <button  onClick={() => navigate("/RecruiterAdmin-Dashboard/JDDetails/GenerateAssessment")} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                            Generate Assessment
                        </button>
                    </div>
                </div>
                
                {showResumeSummary && <ResumeSummary onClose={() => setShowResumeSummary(false)} />}

            </div>
        </div>
    );
}

export default JDDetails;