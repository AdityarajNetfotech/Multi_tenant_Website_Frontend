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
        Filtered Candidate
      </h2>
      <p className="text-gray-600 mb-4">{jobTitle}</p>

      <a
        href={candidate?.resume || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium hover:underline inline-block mb-4"
      >
        {candidate?.name || "N/A"}
      </a>

      <div className="mb-3 text-sm text-gray-700">
        <span className="font-semibold">Email :</span> {candidate?.email || "N/A"}
      </div>

      {candidate?.phone && (
        <div className="mb-3 text-sm text-gray-700">
          <span className="font-semibold">Phone :</span> {candidate?.phone}
        </div>
      )}

      <div className="mb-4 text-sm text-gray-700">
        <span className="font-semibold">Skills :</span> {candidate?.skills || "N/A"}
      </div>

      <div className="mb-6">
        <span className="font-semibold text-gray-700">Status :</span>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-blue-500 h-3 rounded-full text-xs text-white flex items-center justify-center"
            style={{ width: `${candidate?.percentage || 0}%` }}
          >
            {candidate?.percentage || 0}%
          </div>
        </div>
      </div>

      <h1 className="pl-1 mb-1 text-gray-800 font-medium">Summary</h1>
      <div className="mb-6 border rounded-lg bg-gray-50 p-4 text-sm text-gray-800 leading-relaxed">
        <p>{candidate?.aiExplanation || "No AI explanation available"}</p>
      </div>


      {candidate?.resume && (
        <div className="mt-4">
          <a
            href={candidate.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );
}