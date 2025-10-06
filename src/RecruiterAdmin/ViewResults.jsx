import React from "react";
import { X } from 'lucide-react';

export default function ViewResults({ jobData, onClose }) {
    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-xl ring-1 ring-gray-200 p-6 relative">


                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>

                <h1 className="text-2xl font-semibold text-gray-900">
                    {jobData?.jobTitle || 'N/A'} <span className="font-normal text-gray-500">({jobData?.jobId || 'N/A'})</span>
                </h1>
                <p className="text-gray-700 mt-1">Netfotech Solution</p>

                <div className="mt-6 bg-[#E9E9E9D9] rounded-xl overflow-hidden border border-gray-200">
                    <div className="text-gray-800 font-medium px-4 py-2 border-b border-gray-400">
                        Candidate Information
                    </div>
                    <div className="bg-gray-100/70 px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Email ID:</span>
                            <span className="font-semibold text-gray-900 break-all">N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Phone Number:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-xl overflow-hidden bg-[#E9E9E9D9]">
                    <div className="bg-gray-100 text-gray-800 font-medium px-4 py-2 border-b border-gray-400">
                        Test Summary
                    </div>
                    <div className="bg-gray-100/70 px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Score:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Max Score:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Percentage:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-semibold text-gray-900">N/A</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 rounded-xl overflow-hidden bg-[#E9E9E9D9]">
                    <div className="text-gray-800 font-medium px-4 py-2 border-b border-gray-400">
                        Cheating Insights
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 rounded-lg overflow-hidden">
                        <div className="py-3 text-center text-gray-800">Copy Paste: N/A</div>
                        <div className="py-3 text-center text-gray-800">Face not visible: N/A</div>
                        <div className="py-3 text-center text-gray-800">Tab Switches: N/A</div>
                        <div className="py-3 text-center text-gray-800">Right Clicks: N/A</div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-800 hover:bg-gray-200">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>

                    <div className="text-gray-800 font-medium">
                        N/A
                    </div>

                    <button className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 text-white px-5 py-2.5 hover:bg-black">
                        Next
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}