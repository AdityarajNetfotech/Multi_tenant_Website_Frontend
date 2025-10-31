import React from "react";

export default function RequirementAddNote({ onClose }) {
    return (
           <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-2xl rounded-xl shadow-lg border border-gray-200 relative overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
                >
                    ×
                </button>

                <div className="p-6 border-b border-gray-300">
                    <h1 className="text-2xl font-semibold text-gray-800">UI/UX Designer</h1>
                    <p className="text-gray-600 text-lg mt-1">Ishan Ghosh</p>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <p className="text-gray-700 font-medium mb-2">24.02.2025</p>
                        <div className="bg-gray-100 text-gray-600 p-3 rounded-md text-sm leading-relaxed">
                            Assign this review as urgent. Immediate action required to verify
                            details, confirm it, and finalize matching results.
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-700 font-medium mb-2">Previous Notes</p>
                        <div className="bg-gray-100 text-gray-600 p-3 rounded-md text-sm leading-relaxed">
                            Assign this review as urgent. Immediate action required to verify
                            details, confirm it, and finalize matching results.
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-700 font-medium mb-2">Today</p>
                        <textarea
                            className="w-full h-28 p-3 text-sm border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
                            defaultValue="Assign this candidate profile review as urgent. Immediate action required to verify details, confirm recruiter feedback, and finalize matching results."
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
