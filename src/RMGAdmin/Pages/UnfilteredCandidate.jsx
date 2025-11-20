import React from "react";

export default function UnfilteredCandidate({ candidate, jobTitle, onClose }) {
    return (
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6 relative border border-gray-200">
            <button
                onClick={onClose}
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold"
            >
                ×
            </button>

            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                Unfiltered Candidates
            </h2>
            <p className="text-gray-600 mb-4">{jobTitle}</p>

            <a
                href="#"
                className="text-blue-600 font-medium hover:underline inline-block mb-4"
            >
                {candidate?.name || "John Doe"}
            </a>

            <div className="mb-3 text-sm text-gray-700">
                <span className="font-semibold">Email :</span> {candidate?.email || "johndoe@gmail.com"}
            </div>

            <div className="mb-4 text-sm text-gray-700">
                <span className="font-semibold">Skills :</span> {candidate?.skills || "Basic HTML, CSS knowledge"}
            </div>

            <div className="mb-6">
                <span className="font-semibold text-gray-700">Status :</span>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                    <div
                        className="bg-red-500 h-3 rounded-full text-xs text-white flex items-center justify-center"
                        style={{ width: `${candidate?.percentage || 19}%` }}
                    >
                        {candidate?.percentage || 19}%
                    </div>
                </div>
            </div>

            {/* Rest of your component remains the same */}
            <h1 className="pl-1 mb-1 text-gray-800 font-medium">AI Summary</h1>
            <div className="mb-6 border rounded-lg bg-gray-50 p-4 text-sm text-gray-800 leading-relaxed">
                <p>
                    <strong>Top Skills:</strong> Python, React, Data Analysis, Cloud
                    Computing.
                </p>
                <p>
                    <strong>Experience Range:</strong> 2–7 years (average 4.3 years).
                </p>
                <p>
                    <strong>Location Concentration:</strong> 45% Bangalore, 30% Pune,
                    15% Hyderabad, 10% Remote.
                </p>
                <p>
                    <strong>Availability:</strong> 62% immediately available, 25% within
                    30 days.
                </p>
                <p>
                    <strong>AI Match Score:</strong> Average 87% alignment with job
                    criteria.
                </p>
            </div>

            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                    Reasons for rejection
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                    Limited practical exposure to design systems, weak portfolio
                    presentation, and insufficient demonstration of complex user flows
                    or data-driven design approaches. Needs improvement in visual
                    hierarchy, accessibility considerations, and documentation of design
                    rationale.
                </p>
            </div>
        </div>
    );
}