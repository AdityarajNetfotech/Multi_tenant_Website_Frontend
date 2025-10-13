import React from "react";

const ResumeSummary = ({ onClose }) => {
    return (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-md border border-gray-200 relative">
                <div className="flex justify-between items-center border-b px-5 py-3">
                    <h2 className="text-lg font-semibold text-gray-800">Resume Summary</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-5">
                    <div className="mb-2 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Match</span>
                        <span className="text-sm font-semibold text-red-600">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                            className="bg-red-500 h-2.5 rounded-full"
                            style={{ width: "5%" }}
                        ></div>
                    </div>

                    <h3 className="text-gray-800 font-semibold mb-3">Full Match Summary</h3>

                    <div className="bg-[#D9D9D9] rounded-lg p-4 max-h-72 overflow-y-auto">
                        <p className="text-sm text-gray-700 mb-3">
                            Here's an analysis of the resume against the job description:
                        </p>

                        <h4 className="font-semibold text-gray-800">### Comparison:</h4>

                        <p className="text-sm text-gray-700 mt-2">
                            <strong>1. Match Percentage (out of 100):</strong> <strong>0%</strong>
                        </p>

                        <p className="text-sm text-gray-700 mt-1">
                            <strong>Explanation:</strong> The job description explicitly seeks a{" "}
                            <strong>Python Developer</strong> with proficiency in{" "}
                            <strong>Python</strong> and{" "}
                            <strong>Natural Language Processing (NLP)</strong>. The resume details
                            experience as a <strong>Test Engineer / QA Automation Engineer</strong>{" "}
                            with extensive experience in <strong>Java</strong>, Selenium, Appium, and
                            API testing. There is no mention of Python or NLP anywhere in the resume
                            (skills, experience, or projects).
                        </p>

                        <p className="text-sm text-gray-700 mt-3">
                            <strong>2. Key Matching Skills:</strong>
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                            <li>
                                <strong>None.</strong> The core skills required by the job description
                                (Python, NLP) are completely absent from the candidate's resume.
                            </li>
                        </ul>

                        <p className="text-sm text-gray-700 mt-3">
                            <strong>3. Whether the candidate is a good fit:</strong> No
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeSummary;