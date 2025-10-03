import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function CreateJD() {
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        domain: '',
        qualification: '',
        location: '',
        employmentType: '',
        experience: '',
        numberOfPositions: '',
        salaryRange: '',
        skills: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    const handleUploadJD = () => {
        console.log('Upload JD clicked');
    };

    return (
        <div className="min-h-screen">
            <div className="">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Create</h1>

                <form onSubmit={handleCreate}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium   mb-2">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleInputChange}
                                    placeholder="Enter Job Title"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium   mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Company Name"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="domain" className="block text-sm font-medium   mb-2">
                                    Domain
                                </label>
                                <input
                                    type="text"
                                    id="domain"
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleInputChange}
                                    placeholder="Enter Domain"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="qualification" className="block text-sm font-medium   mb-2">
                                    Qualification
                                </label>
                                <input
                                    type="text"
                                    id="qualification"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleInputChange}
                                    placeholder="Enter Qualification"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium   mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Enter Location"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="employmentType" className="block text-sm font-medium   mb-2">
                                    Employment Type
                                </label>
                                <input
                                    type="text"
                                    id="employmentType"
                                    name="employmentType"
                                    value={formData.employmentType}
                                    onChange={handleInputChange}
                                    placeholder="Enter Employment Type"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="experience" className="block text-sm font-medium   mb-2">
                                    Experience
                                </label>
                                <input
                                    type="text"
                                    id="experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    placeholder="Enter Experience"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="numberOfPositions" className="block text-sm font-medium   mb-2">
                                    No. of Position
                                </label>
                                <div className="relative">
                                    <select
                                        id="numberOfPositions"
                                        name="numberOfPositions"
                                        value={formData.numberOfPositions}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                               focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                               outline-none transition-all text-sm appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="">Select No of Position</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="5+">5+</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                          text-gray-400 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="salaryRange" className="block text-sm font-medium   mb-2">
                                    Salary Range
                                </label>
                                <input
                                    type="text"
                                    id="salaryRange"
                                    name="salaryRange"
                                    value={formData.salaryRange}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 5-8 LPA"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="skills" className="block text-sm font-medium   mb-2">
                                    Skills
                                </label>
                                <input
                                    type="text"
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    placeholder="Enter Skills"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                             outline-none transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="px-12 py-3 bg-black text-white rounded-xl font-medium 
                           hover:bg-gray-800 transition-colors shadow-sm"
                            >
                                Create
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 pb-6">
                        <div className="px-6 sm:px-8 py-4 border-b border-gray-300">
                            <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
                        </div>

                        <div className="bg-gray-50 min-h-[200px] 
                            flex items-center justify-center mb-6">
                            <p className="text-sm text-center">
                                Job description will appear here after creation
                            </p>
                        </div>


                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleUploadJD}
                                className="px-12 py-3 bg-black text-white rounded-xl font-medium 
                           hover:bg-gray-800 transition-colors shadow-sm"
                            >
                                Upload JD
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateJD;
