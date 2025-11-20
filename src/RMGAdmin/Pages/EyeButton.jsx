import React from "react";
import { X } from "lucide-react";

export default function EyeButton({ onClose }) {
    return (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            
            {/* Background click close */}
            <div 
                className="absolute inset-0"
                onClick={onClose}
            ></div>

            <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6 relative z-10">

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    UI/UX Designer
                </h2>
                <p className="text-lg font-medium text-gray-700 mb-3">
                    Ishan Ghosh
                </p>
                <hr className="border-gray-300 mb-4" />

                <div className="space-y-3 text-sm md:text-base">

                    <p>
                        <span className="font-semibold text-gray-900">Job Title :</span>{" "}
                        UI/UX Designer
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Priority :</span>{" "}
                        Medium
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Status :</span>{" "}
                        <span className="text-green-600 font-medium">Completed</span>
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Due Date :</span>{" "}
                        25.02.2025
                    </p>

                    <div>
                        <p className="font-semibold text-gray-900 mb-1">Description :</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Translate user research insights into effective design solutions.</li>
                            <li>Develop end-to-end user flows, wireframes, and prototypes.</li>
                            <li>Collaborate closely with developers during implementation.</li>
                            <li>Conduct usability testing and incorporate feedback.</li>
                            <li>Maintain consistent branding across platforms.</li>
                        </ul>
                    </div>

                    <p>
                        <span className="font-semibold text-gray-900">Skills :</span>{" "}
                        Wireframe, Prototyping, User Research, User Interaction
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Experience :</span>{" "}
                        2 to 3 Years
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Position Available :</span>{" "}
                        3
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Location :</span>{" "}
                        New Town
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">City :</span> Kolkata
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">State :</span>{" "}
                        West Bengal
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Country :</span> India
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Employment Type :</span>{" "}
                        Full Time
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Currency :</span> INR
                    </p>

                    <p>
                        <span className="font-semibold text-gray-900">Salary :</span>{" "}
                        5 to 7 lakhs
                    </p>

                </div>
            </div>
        </div>
    );
}
