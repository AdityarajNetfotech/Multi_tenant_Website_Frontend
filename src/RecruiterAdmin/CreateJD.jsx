import { useState, useEffect } from 'react';
import { ChevronDown, X, Copy, Check } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SpinLoader from '../components/SpinLoader';

function CreateJD() {
    const location = useLocation();
    const [formData, setFormData] = useState({
        offerId: '',
        companyName: '',
        // department: '',
        // reportingManager: '',
        keyResponsibilities: '',
        qualifications: '',
        benefits: '',
        additionalNotes: '',
    });

    const [creating, setCreating] = useState(false);
    const [generatedJD, setGeneratedJD] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [jdUrl, setJdUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (location.state?.offerId) {
            setFormData((prev) => ({
                ...prev,
                offerId: location.state.offerId,
                companyName: location.state.companyName || '',
            }));
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!formData.offerId) {
            alert('Please select an offer from the JD page table');
            return;
        }

        try {
            setCreating(true);
            const response = await axios.post(
                `http://localhost:4000/api/jd/${formData.offerId}/ai`,
                {
                    companyName: formData.companyName,
                    // department: formData.department,
                    // reportingManager: formData.reportingManager,
                    keyResponsibilities: formData.keyResponsibilities,
                    qualifications: formData.qualifications,
                    benefits: formData.benefits,
                    additionalNotes: formData.additionalNotes,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('JD Creation Response:', response.data);

            if (response.data.success) {
                setGeneratedJD(response.data.jd);
                // Set the URL - adjust based on your actual response structure
                const generatedUrl = response.data.jd?.url || `${window.location.origin}/jd/${response.data.jd?._id || formData.offerId}`;
                setJdUrl(generatedUrl);
                setShowSuccessPopup(true);
            }
        } catch (error) {
            console.error('Error creating JD:', error);
            alert(error.response?.data?.error || 'Failed to create JD');
        } finally {
            setCreating(false);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(jdUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
        setCopied(false);
    };

    const handleUploadJD = () => {
        console.log('Upload JD clicked');
    };

    return (
        <div className="min-h-screen">
            {creating && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0  backdrop-blur-sm"></div>
                    <div className="relative z-10">
                        <SpinLoader />
                    </div>
                </div>
            )}

            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={handleClosePopup}
                    ></div>
                    <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <svg 
                                    className="w-8 h-8 text-green-500" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M5 13l4 4L19 7" 
                                    />
                                </svg>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">
                            JD Created Successfully!
                        </h3>
                        <p className="text-sm text-center text-gray-500 mb-6">
                            Your job description has been created. Copy the link below to share.
                        </p>

                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <input
                                type="text"
                                value={jdUrl}
                                readOnly
                                className="flex-1 bg-transparent text-sm text-gray-700 outline-none truncate"
                            />
                            <button
                                onClick={handleCopyLink}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    copied 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-black text-white hover:bg-gray-800'
                                }`}
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>

                        <button
                            onClick={handleClosePopup}
                            className="w-full mt-4 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <div className="">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Create</h1>

                <form onSubmit={handleCreate}>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="offerId" className="block text-sm font-medium mb-2">
                                    Offer ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="offerId"
                                    name="offerId"
                                    value={formData.offerId}
                                    onChange={handleInputChange}
                                    placeholder="Select from JD page table"
                                    readOnly
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm bg-gray-50 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    readOnly
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm bg-gray-50 cursor-not-allowed"
                                />
                            </div>

                            {/* <div>
                                <label htmlFor="department" className="block text-sm font-medium mb-2">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    placeholder="Enter Department"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="reportingManager" className="block text-sm font-medium mb-2">
                                    Reporting Manager
                                </label>
                                <input
                                    type="text"
                                    id="reportingManager"
                                    name="reportingManager"
                                    value={formData.reportingManager}
                                    onChange={handleInputChange}
                                    placeholder="Enter Reporting Manager"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm"
                                />
                            </div> */}

                            <div className="md:col-span-2">
                                <label htmlFor="keyResponsibilities" className="block text-sm font-medium mb-2">
                                    Key Responsibilities
                                </label>
                                <textarea
                                    id="keyResponsibilities"
                                    name="keyResponsibilities"
                                    value={formData.keyResponsibilities}
                                    onChange={handleInputChange}
                                    placeholder="Enter Key Responsibilities (separate with commas or new lines)"
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="qualifications" className="block text-sm font-medium mb-2">
                                    Qualifications
                                </label>
                                <textarea
                                    id="qualifications"
                                    name="qualifications"
                                    value={formData.qualifications}
                                    onChange={handleInputChange}
                                    placeholder="Enter Required Qualifications"
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="benefits" className="block text-sm font-medium mb-2">
                                    Benefits
                                </label>
                                <textarea
                                    id="benefits"
                                    name="benefits"
                                    value={formData.benefits}
                                    onChange={handleInputChange}
                                    placeholder="Enter Benefits (separate with commas or new lines)"
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="additionalNotes" className="block text-sm font-medium mb-2">
                                    Additional Notes
                                </label>
                                <textarea
                                    id="additionalNotes"
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleInputChange}
                                    placeholder="Enter any additional notes or requirements"
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        outline-none transition-all text-sm resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                disabled={creating || !formData.offerId}
                                className={`px-12 py-3 bg-black text-white rounded-xl font-medium 
                                    transition-colors shadow-sm ${creating || !formData.offerId
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-gray-800'
                                    }`}
                            >
                                {creating ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 pb-6">
                        <div className="px-6 sm:px-8 py-4 border-b border-gray-300">
                            <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
                        </div>

                        <div className="bg-gray-50 min-h-[200px] p-6">
                            {generatedJD ? (
                                <div className="space-y-4">
                                    {generatedJD.jobSummary && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Job Summary</h3>
                                            <p className="text-sm text-gray-700">{generatedJD.jobSummary}</p>
                                        </div>
                                    )}
                                    {generatedJD.responsibilities && generatedJD.responsibilities.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Responsibilities</h3>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {generatedJD.responsibilities.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {generatedJD.requirements && generatedJD.requirements.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {generatedJD.requirements.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {generatedJD.benefits && generatedJD.benefits.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                                            <ul className="list-disc list-inside text-sm text-gray-700">
                                                {generatedJD.benefits.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {generatedJD.additionalInfo && (
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
                                            <p className="text-sm text-gray-700">{generatedJD.additionalInfo}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full min-h-[150px]">
                                    <p className="text-sm text-center text-gray-500">
                                        Job description will appear here after creation
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={handleUploadJD}
                                disabled={!generatedJD}
                                className={`px-12 py-3 bg-black text-white rounded-xl font-medium 
                                    transition-colors shadow-sm ${!generatedJD
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-gray-800'
                                    }`}
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