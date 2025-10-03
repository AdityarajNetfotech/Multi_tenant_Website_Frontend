import React, { useState } from 'react';
import { Upload, ChevronDown, Trash2 } from 'lucide-react';
import img from '../img/RRejister.png'

function RecruiterRejister() {
    const [formData, setFormData] = useState({
        companyName: '',
        companyType: '',
        contactPerson: '',
        email: '',
        phoneNumber: '',
        employeeCount: '',
        gstNumber: '',
        panNumber: '',
        staffingType: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        logo: null,
        themeColor: '#8B5CF6'
    });

    const [selectedCountryCode, setSelectedCountryCode] = useState('+91');

    const countryCode = ['+91', '+1', '+44', '+86', '+81'];
    const states = [
        'Select State',
        'Maharashtra',
        'Delhi',
        'Karnataka',
        'Tamil Nadu',
        'Gujarat',
        'Uttar Pradesh',
        'West Bengal',
        'Rajasthan'
    ];
    const themeColors = ['#6D28D9', '#3B82F6', '#C5C5C5'];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({
                ...formData,
                logo: file
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-6 items-start">
            <div className="hidden lg:flex justify-center items-start pt-20">
                <img
                    src={img}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-purple-600 mb-2">AIRecruit</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-white border-gray-500 border rounded-4xl">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-500 py-1 px-6 sm:px-8">
                            Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-6 sm:px-8 pb-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Company Name"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Company Type
                                </label>
                                <input
                                    type="text"
                                    name="companyType"
                                    value={formData.companyType}
                                    onChange={handleInputChange}
                                    placeholder="Enter Company Type"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleInputChange}
                                    placeholder="Enter Contact Person"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter Email"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Phone Number
                                </label>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="relative w-full sm:w-20">
                                        <select
                                            value={selectedCountryCode}
                                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                                            className="appearance-none border bg-gray-100 border-gray-300 border-r-0 rounded-l-lg px-4 py-1 pr-8 w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        >
                                            {countryCode.map((code) => (
                                                <option key={code} value={code}>
                                                    {code}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    </div>

                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter Phone Number"
                                        className="w-full sm:flex-1 px-4 py-1 border border-gray-300 bg-gray-100 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    How many Employees do you have?
                                </label>
                                <input
                                    type="text"
                                    name="employeeCount"
                                    value={formData.employeeCount}
                                    onChange={handleInputChange}
                                    placeholder="Number of Employees"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    GST Number
                                </label>
                                <input
                                    type="text"
                                    name="gstNumber"
                                    value={formData.gstNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter GST Number"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Pan Number
                                </label>
                                <input
                                    type="text"
                                    name="panNumber"
                                    value={formData.panNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter PAN Number"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">
                                    Type of Staffing (Contract/Permanent/Both)
                                </label>
                                <input
                                    type="text"
                                    name="staffingType"
                                    value={formData.staffingType}
                                    onChange={handleInputChange}
                                    placeholder="Enter Type of Staffing"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-gray-500 border rounded-4xl">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-500 py-1 px-6 sm:px-8">
                            Address
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 px-6 sm:px-8">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Address 1
                                </label>
                                <textarea
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                    placeholder="Enter Address 1"
                                    rows="2"
                                    className="w-full px-4 pt-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Address 2
                                </label>
                                <textarea
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                    placeholder="Enter Address 2"
                                    rows="2"
                                    className="w-full px-4 pt-2 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter City"
                                    className="w-full px-4 py-1 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    State
                                </label>
                                <div className="relative">
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full appearance-none px-4 py-1 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-10"
                                    >
                                        {states.map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className='border-gray-500 border rounded-4xl'>
                                <div className='border-b border-gray-500 text-xl py-1 px-6 sm:px-8'>
                                    <label className="block font-medium text-gray-900">Logo</label>
                                </div>

                                <div className="flex flex-col justify-between sm:flex-row items-start gap-4 py-3 px-6 sm:px-8">
                                    <div className="w-35 h-20 bg-gray-50 border border-gray-500 rounded-md flex items-center justify-center overflow-hidden">
                                        {formData.logo ? (
                                            <img
                                                src={typeof formData.logo === 'string' ? formData.logo : URL.createObjectURL(formData.logo)}
                                                alt="Logo preview"
                                                className="max-h-full max-w-full object-contain p-2"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400">No logo</span>
                                        )}
                                    </div>

                                    <div className="flex sm:flex-col items-stretch gap-2">
                                        <input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="logo-upload"
                                            className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-gray-500 bg-white text-sm text-gray-800 hover:bg-gray-50 cursor-pointer"
                                        >
                                            <Upload className="h-4 w-4" />
                                            Upload a file
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (formData.logo && typeof formData.logo === 'string' && formData.logo.startsWith('blob:')) {
                                                    try { URL.revokeObjectURL(formData.logo); } catch { }
                                                }
                                                setFormData({ ...formData, logo: null });
                                                const input = document.getElementById('logo-upload');
                                                if (input) input.value = '';
                                            }}
                                            disabled={!formData.logo}
                                            className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full border text-sm
              ${formData.logo
                                                    ? 'bg-red-50 text-red-700 border-red-500 hover:bg-red-100'
                                                    : 'bg-red-50/50 text-red-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='border-gray-500 border rounded-4xl'>
                                <div className='border-b border-gray-500 py-1 text-xl px-6 sm:px-8'>
                                    <label className="block font-medium text-gray-900">Theme Color</label>
                                </div>

                                <div className="flex items-center gap-3 py-3 px-6 sm:px-8">
                                    {themeColors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, themeColor: color })}
                                            title={color}
                                            className={`h-12 w-16 rounded-md border-2 transition-all
              ${formData.themeColor === color
                                                    ? 'border-purple-600 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.75)]'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[#6D28D9] text-white font-semibold py-3 px-12 rounded-4xl transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RecruiterRejister;
