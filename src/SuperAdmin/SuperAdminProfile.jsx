import React, { useState } from 'react';
import { Upload, Trash2, Check } from 'lucide-react';

const RecruiterProfile = () => {
    const [formData, setFormData] = useState({
        firstName: 'Mehrab',
        lastName: 'Mehrab',
        email: 'Mehrabbozorgi.business@gmail.com',
        address: '33062 Zboncak isle',
        contactNumber: '9876543210',
        city: 'Mehrab',
        state: 'Bozorgi',
        password: 'sbdfbnd65sfdvb s'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log('Saving profile:', formData);
    };

    const handleCancel = () => {
        console.log('Cancelling changes');
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)] max-w-3xl mx-auto rounded-xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">Profile</h1>

            {/* Profile Avatar Section */}
            <div className="flex flex-col md:flex-row items-center mb-8 space-x-8">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold mb-4">
                    MB
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <span>Upload Image</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            {/* Profile Form */}
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number
                    </label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            City
                        </label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                            <option value="Mehrab">Mehrab</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            State
                        </label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        >
                            <option value="Bozorgi">Bozorgi</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Karnataka">Karnataka</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-500" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RecruiterProfile;
