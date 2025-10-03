import React from "react";

const CompanyDetail = () => {
    return (
        
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Name</h2>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="Company Logo"
                        className="w-20 h-20 rounded-full object-contain border"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Netfotech Solutions
                        </h3>
                    </div>
                </div>

                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Registration Date
                            </label>
                            <input
                                type="text"
                                value="12.04.2025"
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Valid Till
                            </label>
                            <input
                                type="text"
                                value="12.04.2025"
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Contact Person Name
                            </label>
                            <input
                                type="text"
                                value="Rajesh Pandi"
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                value="9748049201"
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Booking
                            </label>
                            <input
                                type="text"
                                value="12.04.2025"
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>

                        <div className="flex justify-between">
                            <div className="">
                                <label className="block mb-2 text-md font-medium text-gray-700">
                                    Free Trial
                                </label>
                                <div className="mt-1">
                                    <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                                        3 Months
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-md mb-2 font-medium text-gray-700">
                                    Subscriptions
                                </label>
                                <div className="mt-1">
                                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                                        Free Trial
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email ID
                            </label>
                            <input
                                type="email"
                                value="rajeshp@netfotech.in"
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Company Website
                            </label>
                            <input
                                type="text"
                                value="https://netfotech.in/"
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50 text-blue-600 underline"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
