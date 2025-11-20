import React from "react";

export default function FilteredCandidate({ candidate, jobTitle, onClose }) {
  return (
    <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6 relative border border-gray-200">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl font-semibold"
      >
        ×
      </button>

      <h2 className="text-2xl font-semibold text-gray-900 mb-1">
        Filtered Candidates
      </h2>
      <p className="text-gray-600 mb-4">{jobTitle}</p>

      <a
        href="#"
        className="text-blue-600 font-medium hover:underline inline-block mb-4"
      >
        {candidate?.name || "Trina Das"}
      </a>

      <div className="mb-3 text-sm text-gray-700">
        <span className="font-semibold">Email :</span> {candidate?.email || "trinadas01@gmail.com"}
      </div>

      <div className="mb-4 text-sm text-gray-700">
        <span className="font-semibold">Skills :</span> {candidate?.skills || "Wireframe, Prototyping, User Research, userflow, communication, leadership"}
      </div>

      <div className="mb-6">
        <span className="font-semibold text-gray-700">Status :</span>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-blue-500 h-3 rounded-full text-xs text-white flex items-center justify-center"
            style={{ width: `${candidate?.percentage || 79}%` }}
          >
            {candidate?.percentage || 79}%
          </div>
        </div>
      </div>

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

      <div className="bg-green-100 border border-green-300 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          Reasons for selection
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Strong creative and analytical skills, a clear understanding of
          user-centered design principles, and proficiency in modern tools
          (Figma, Adobe XD). Their portfolio reflects intuitive, accessible,
          and visually engaging interfaces that enhance user experience and
          align with the company's brand and product goals.
        </p>
      </div>
    </div>
  );
}