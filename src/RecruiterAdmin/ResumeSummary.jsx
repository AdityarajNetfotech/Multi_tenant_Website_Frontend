import React from "react";

const ResumeSummary = ({ onClose, candidate }) => {
    const aiScore = candidate?.aiScore || 0;
    
    const getScoreColor = (score) => {
        if (score >= 70) return { bg: "bg-green-500", text: "text-green-600" };
        if (score >= 40) return { bg: "bg-yellow-500", text: "text-yellow-600" };
        return { bg: "bg-red-500", text: "text-red-600" };
    };

    const scoreColor = getScoreColor(aiScore);

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
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
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">{candidate?.name || 'N/A'}</h3>
                        <p className="text-sm text-gray-600">{candidate?.email || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{candidate?.phone || 'N/A'}</p>
                        <div className="mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                candidate?.isFiltered 
                                    ? "bg-blue-100 text-blue-700" 
                                    : "bg-red-100 text-red-700"
                            }`}>
                                {candidate?.isFiltered ? "Filtered" : "Unfiltered"}
                            </span>
                        </div>
                    </div>

                    <div className="mb-2 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Match</span>
                        <span className={`text-sm font-semibold ${scoreColor.text}`}>
                            {aiScore}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                        <div
                            className={`${scoreColor.bg} h-2.5 rounded-full transition-all duration-300`}
                            style={{ width: `${aiScore}%` }}
                        ></div>
                    </div>

                    <h3 className="text-gray-800 font-semibold mb-3">Full Match Summary</h3>

                    <div className="bg-[#D9D9D9] rounded-lg p-4 max-h-72 overflow-y-auto">
                        {candidate?.aiExplanation ? (
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                {candidate.aiExplanation}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                No AI analysis available for this candidate.
                            </p>
                        )}
                    </div>

                    {candidate?.resume && (
                        <div className="mt-4">
                            <a
                                href={candidate.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <svg 
                                    className="w-4 h-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                    />
                                </svg>
                                View Resume
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeSummary;