import React, { useState } from "react";
import { Search, MapPin, SlidersHorizontal, X, Upload } from "lucide-react";
import Pagination from "../../components/LandingPage/Pagination";

const AllJDs = () => {
    const candidates = [
        {
            id: 1,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Kolkata",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹6 LPA",
            expectedCTC: "₹8 LPA",
            noticePeriod: "30 days",
            resume: "resume_uiux_designer_2024.pdf"
        },
        {
            id: 2,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Bengaluru",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹5 LPA",
            expectedCTC: "₹7 LPA",
            noticePeriod: "45 days",
            resume: "resume_designer_2024.pdf"
        },
        {
            id: 3,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Kolkata",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹6 LPA",
            expectedCTC: "₹8 LPA",
            noticePeriod: "30 days",
            resume: "resume_uiux_designer_2024.pdf"
        },
        {
            id: 4,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Kolkata",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹6 LPA",
            expectedCTC: "₹8 LPA",
            noticePeriod: "30 days",
            resume: "resume_uiux_designer_2024.pdf"
        },
        {
            id: 5,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Kolkata",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹6 LPA",
            expectedCTC: "₹8 LPA",
            noticePeriod: "30 days",
            resume: "resume_uiux_designer_2024.pdf"
        },
        {
            id: 6,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Kolkata",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹6 LPA",
            expectedCTC: "₹8 LPA",
            noticePeriod: "30 days",
            resume: "resume_uiux_designer_2024.pdf"
        },
        {
            id: 7,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Kolkata",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹6 LPA",
            expectedCTC: "₹8 LPA",
            noticePeriod: "30 days",
            resume: "resume_uiux_designer_2024.pdf"
        },
        {
            id: 8,
            title: "UI/UX Designer",
            location: "Kolkata, Bengaluru",
            company: "Netfotech Solution",
            companyId: "#145756",
            skills: "Wireframe, UX Research, Figma, Framework, etc.",
            primaryLocation: "Kolkata",
            skillsArray: ["Wireframe", "UX Research", "Figma", "Framework"],
            currentCTC: "₹6 LPA",
            expectedCTC: "₹8 LPA",
            noticePeriod: "30 days",
            resume: "resume_uiux_designer_2024.pdf"
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [showCandidateModal, setShowCandidateModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [resume, setResume] = useState(null);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(candidates.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCandidates = candidates.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleApplyClick = (candidate) => {
        setSelectedJob(candidate);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
        setShowModal(false);
    };

    const handleApplyFromModal = () => {
        setShowModal(false);
        setShowApplicationForm(true);
    };

    const handleCloseApplicationForm = () => {
        setShowApplicationForm(false);
        setResume(null);
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmitApplication = (e) => {
        e.preventDefault();
        setShowApplicationForm(false);
        setShowCandidateModal(true);
        console.log("Form submitted");
    };

    const handleCloseCandidateModal = () => {
        setShowCandidateModal(false);
        setSelectedJob(null);
        setResume(null);
    };

    return (
        <div className="min-h-screen">
            <header>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl text-gray-900">Candidate</h1>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                            <input
                                type="text"
                                placeholder="Search by Candidate Name"
                                className="w-full sm:w-64 pl-2 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button className="absolute right-0 top-0 h-full px-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg transition-colors hover:bg-gray-800">
                            <SlidersHorizontal className="w-5 h-5" />
                            <span className="font-medium">Filter</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {currentCandidates.map((candidate) => (
                        <div
                            key={candidate.id}
                            className="bg-white rounded-lg border border-gray-300 shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-3">{candidate.title}</h2>

                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm text-green-600 font-medium">
                                    {candidate.location}
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-900 font-medium">
                                    {candidate.company}{" "}
                                    <span className="text-gray-600">({candidate.companyId})</span>
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {candidate.skills}
                                </p>
                                <div className="flex justify-end">
                                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-1 font-medium">
                                        View more
                                    </button>
                                </div>
                            </div>

                            <hr className="mb-4" />

                            <div className="flex justify-between items-center gap-3">
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                                    View details
                                </button>
                                <button
                                    onClick={() => handleApplyClick(candidate)}
                                    className="px-6 bg-black text-white py-1.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </main>

            {showModal && selectedJob && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
                        >
                            <X size={22} />
                        </button>

                        <div className="p-6 space-y-5">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
                                <div className="flex items-center text-red-600 text-sm font-medium">
                                    <MapPin size={16} className="mr-1" />
                                    {selectedJob.location}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Job Summary:</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    As a UI/UX Designer, you'll design intuitive, user-centered interfaces that
                                    enhance engagement and usability. You'll work cross-functionally with
                                    product, marketing, and engineering teams to deliver high-quality digital
                                    experiences.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h3>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    <li>Translate user research insights into effective design solutions.</li>
                                    <li>Develop end-to-end user flows, wireframes, and prototypes.</li>
                                    <li>Collaborate closely with developers during implementation.</li>
                                    <li>Conduct usability testing and incorporate feedback.</li>
                                    <li>
                                        Maintain consistent branding and design standards across platforms.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                    <li>2–4 years of proven experience in UI/UX design.</li>
                                    <li>Strong portfolio showcasing web and mobile design projects.</li>
                                    <li>Proficiency in design tools (Figma, Adobe XD, Miro).</li>
                                    <li>Knowledge of HTML/CSS is a plus.</li>
                                    <li>Excellent communication and collaboration skills.</li>
                                </ul>
                            </div>

                            <hr />

                            <div className="pt-2 flex justify-center">
                                <button
                                    onClick={handleApplyFromModal}
                                    className="bg-black text-white font-medium py-2 px-16 rounded-lg transition hover:bg-gray-800 mx-auto"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showApplicationForm && selectedJob && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                            onClick={handleCloseApplicationForm}
                        >
                            <X size={22} />
                        </button>

                        <div className="p-6">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Apply for {selectedJob.title}
                                </h2>
                                <div className="flex items-center gap-1 text-red-500 mt-1">
                                    <MapPin size={16} />
                                    <span>{selectedJob.primaryLocation || selectedJob.location.split(',')[0]}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitApplication} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Resume<span className="text-red-500">*</span>
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                                        <Upload size={28} className="text-gray-400 mb-2" />
                                        <label
                                            htmlFor="resume"
                                            className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 text-sm"
                                        >
                                            Upload a Resume
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2">
                                            PDF, DOC, DOCX up to 5MB
                                        </p>
                                        <input
                                            id="resume"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        {resume && (
                                            <p className="mt-2 text-sm text-green-600">{resume.name}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Skills<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter skills"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current CTC
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g.: 6 LPA"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Expected CTC
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g.: 7 LPA"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Current Location
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g.: Kolkata, Bengaluru, etc."
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notice Period
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g.: 3 Months, 6 Months, etc."
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="relocate"
                                        className="w-4 h-4 border-gray-300 rounded accent-black"
                                    />
                                    <label
                                        htmlFor="relocate"
                                        className="text-sm text-gray-700 select-none"
                                    >
                                        I am willing to relocate for this position
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showCandidateModal && selectedJob && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full overflow-y-auto relative">
                        <button
                            onClick={handleCloseCandidateModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
                        >
                            <X size={22} />
                        </button>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold">
                                View for {selectedJob?.title}
                            </h2>
                            <p className="flex items-center text-red-500 font-medium">
                                <span className="mr-2">📍</span>
                                {selectedJob?.primaryLocation || selectedJob?.location.split(',')[0]}
                            </p>

                            <div className="space-y-2">
                                <div>
                                    <span className="font-semibold">Company:</span>{" "}
                                    {selectedJob?.company}
                                </div>
                                <div>
                                    <span className="font-semibold">Skills:</span>{" "}
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {(selectedJob?.skillsArray || ["Wireframe", "UX Research", "Figma", "Framework"]).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-semibold">Location:</span>{" "}
                                    {selectedJob?.location}
                                </div>
                                <div>
                                    <span className="font-semibold">Current CTC:</span>{" "}
                                    {selectedJob?.currentCTC || "₹6 LPA"}
                                </div>
                                <div>
                                    <span className="font-semibold">Expected CTC:</span>{" "}
                                    {selectedJob?.expectedCTC || "₹8 LPA"}
                                </div>
                                <div>
                                    <span className="font-semibold">Notice Period:</span>{" "}
                                    {selectedJob?.noticePeriod || "30 days"}
                                </div>
                            </div>

                            <div>
                                <span className="font-semibold">Resume:</span>
                                <div className="mt-1 flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2">
                                    <span className="truncate">{selectedJob?.resume || "resume_2024.pdf"}</span>
                                    <button
                                        className="text-gray-500 hover:text-black"
                                        onClick={() => navigator.clipboard.writeText(selectedJob?.resume || "resume_2024.pdf")}
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllJDs;