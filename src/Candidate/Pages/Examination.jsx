import React from "react";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Examination() {
    const navigate = useNavigate()
    const jobs = [
        {
            title: "UI/UX Designer",
            location: "Kolkata",
            workType: "Full-time",
            employmentMode: "On-Site",
            description:
                "We are seeking a creative and detail-oriented UI/UX Designer to design engaging, user-friendly digital experiences. The ideal candidate combi....",
            examDate: "16 May,2025",
            endDate: "24 May,2025",
            isActive: true,
        },
        {
            title: "Visual Designer",
            location: "Bengaluru",
            workType: "Full-time",
            employmentMode: "On-Site",
            description:
                "We are seeking a creative and detail-oriented UI/UX Designer to design engaging, user-friendly digital experiences. The ideal candidate combi....",
            examDate: "16 May,2025",
            endDate: "24 May,2025",
            isActive: false,
        },
        {
            title: "Graphic Designer",
            location: "Bengaluru, Noida",
            workType: "Full-time",
            employmentMode: "On-Site",
            description:
                "We are seeking a creative and detail-oriented UI/UX Designer to design engaging, user-friendly digital experiences. The ideal candidate combi....",
            examDate: "16 May,2025",
            endDate: "24 May,2025",
            isActive: true,
        },
    ];

    return (
        <div className="min-h-screen">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-300 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
                    >
                        <div className="flex-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                                {job.title}
                            </h2>
                            <p className="text-red-500 text-sm sm:text-base mb-4">
                                {job.location}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="px-3 py-1 text-xs sm:text-sm font-medium text-green-700 bg-green-50 border border-green-300 rounded-xl">
                                    {job.workType}
                                </span>
                                <span className="px-3 py-1 text-xs sm:text-sm font-medium text-purple-700 bg-purple-50 border border-purple-300 rounded-xl">
                                    {job.employmentMode}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                {job.description}
                            </p>

                            <div className="space-y-2 text-sm sm:text-base mb-4">
                                <div className="flex">
                                    <span className="font-semibold text-gray-900 min-w-[100px]">
                                        Exam date :
                                    </span>
                                    <span className="text-gray-700 ml-2">{job.examDate}</span>
                                </div>
                                <div className="flex">
                                    <span className="font-semibold text-gray-900 min-w-[100px]">
                                        End date :
                                    </span>
                                    <span className="text-gray-700 ml-2">{job.endDate}</span>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="flex justify-end">
                            <button
                            onClick={() => navigate("/Candidate-Dashboard/Examination/TestDetails")}
                                disabled={!job.isActive}
                                className={`mt-2 w-[100px] py-2 rounded-2xl font-medium text-sm sm:text-base transition-all duration-300 ${job.isActive
                                        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Give Test
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
