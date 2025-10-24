import React, { useState, useRef } from 'react'
import { Pencil, Trash2, Upload, Save, X, FileText, Eye } from "lucide-react";

function CandidateProfile() {
    const initialData = {
        personalInfo: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "9876543210",
            dateOfBirth: "1995-06-15",
            gender: "Male",
            nationality: "Indian"
        },
        contactInfo: {
            streetAddress: "123 Main Street",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India",
            zipCode: "400001",
            linkedIn: "linkedin.com/in/johndoe",
            github: "github.com/johndoe",
            portfolio: "johndoe.dev"
        },
        education: {
            degree: "Bachelor of Technology",
            fieldOfStudy: "Computer Science",
            institution: "IIT Mumbai",
            startYear: "2013",
            endYear: "2017",
            grade: "8.5 CGPA"
        },
        experiences: [
            {
                id: 1,
                jobTitle: "Senior Software Engineer",
                companyName: "Tech Solutions Inc.",
                location: "Mumbai",
                startDate: "2018-07",
                endDate: "2023-12",
                isCurrentJob: false,
                description: "Led development of multiple web applications using React and Node.js",
                achievements: "Reduced application load time by 40%",
                technologies: "React, Node.js, MongoDB, AWS"
            }
        ],
        portfolio: {
            projectTitle: "E-commerce Platform",
            projectUrl: "https://myproject.com",
            projectDescription: "Full-stack e-commerce solution",
            certificateTitle: "AWS Certified Developer",
            issueDate: "2022-05"
        }
    };

    const [formData, setFormData] = useState(initialData);
    const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387");
    const [uploadedFiles, setUploadedFiles] = useState({
        resume: null,
        coverLetter: null,
        certificate: null
    });
    
    const [editMode, setEditMode] = useState({
        personalInfo: false,
        contactInfo: false,
        education: false,
        experience: false,
        documents: false
    });

    const profileImageRef = useRef(null);
    const resumeRef = useRef(null);
    const coverLetterRef = useRef(null);
    const certificateRef = useRef(null);

    const emptyExperience = {
        id: Date.now(),
        jobTitle: "",
        companyName: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrentJob: false,
        description: "",
        achievements: "",
        technologies: ""
    };

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageDelete = () => {
        setProfileImage(null);
        if (profileImageRef.current) {
            profileImageRef.current.value = '';
        }
    };

    const handleFileUpload = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFiles(prev => ({
                ...prev,
                [fileType]: {
                    name: file.name,
                    size: (file.size / 1024).toFixed(2) + ' KB',
                    type: file.type,
                    url: URL.createObjectURL(file)
                }
            }));
        }
    };

    const handleFileDelete = (fileType) => {
        setUploadedFiles(prev => ({
            ...prev,
            [fileType]: null
        }));

        switch(fileType) {
            case 'resume':
                if (resumeRef.current) resumeRef.current.value = '';
                break;
            case 'coverLetter':
                if (coverLetterRef.current) coverLetterRef.current.value = '';
                break;
            case 'certificate':
                if (certificateRef.current) certificateRef.current.value = '';
                break;
            default:
                break;
        }
    };

    const handleFilePreview = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleEdit = (section) => {
        setEditMode(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleExperienceChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.map((exp, i) => 
                i === index ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const addNewExperience = () => {
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, { ...emptyExperience, id: Date.now() }]
        }));
        setEditMode(prev => ({ ...prev, experience: true }));
    };

    const removeExperience = (index) => {
        if (formData.experiences.length > 1) {
            setFormData(prev => ({
                ...prev,
                experiences: prev.experiences.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSave = () => {
        console.log("Saving data:", formData);
        console.log("Uploaded files:", uploadedFiles);
        alert("Profile saved successfully!");
        setEditMode({
            personalInfo: false,
            contactInfo: false,
            education: false,
            experience: false,
            documents: false
        });
    };

    return (
        <>
        <section className='flex flex-col items-center'>
            <div className="border border-gray-400 shadow-xl rounded-3xl p-6 bg-gray-50 min-h-screen">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                    <div className='space-y-2'>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                ref={profileImageRef}
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageUpload}
                                className="hidden"
                                id="profile-upload"
                            />
                            <label
                                htmlFor="profile-upload"
                                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md transition cursor-pointer">
                                <Upload size={18} /> Upload Image
                            </label>
                            <button 
                                onClick={handleProfileImageDelete}
                                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-medium px-4 py-2 rounded-md transition">
                                <Trash2 size={18} /> Delete
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">
                            At least 800×800 px allowed. PNG or JPG is allowed.
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-sm border border-gray-400 rounded-2xl mb-8">
                    <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
                        <h2 className="font-semibold text-gray-800 text-lg">
                            Personal Information
                        </h2>
                        <button
                            onClick={() => handleEdit('personalInfo')}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                            <Pencil size={16} /> Edit
                        </button>
                    </div>

                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={formData.personalInfo.firstName}
                                onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                                disabled={!editMode.personalInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={formData.personalInfo.lastName}
                                onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                                disabled={!editMode.personalInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={formData.personalInfo.email}
                                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                                disabled={!editMode.personalInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <div className="flex gap-1">
                                <select
                                    disabled={!editMode.personalInfo}
                                    className={`rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/3 ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}>
                                    <option value="">+91</option>
                                </select>
                                <input
                                    type="text"
                                    value={formData.personalInfo.phone}
                                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                                    disabled={!editMode.personalInfo}
                                    className={`rounded-md  py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                value={formData.personalInfo.dateOfBirth}
                                onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                                disabled={!editMode.personalInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                value={formData.personalInfo.gender}
                                onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                                disabled={!editMode.personalInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}>
                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Nationality
                            </label>
                            <input
                                type="text"
                                value={formData.personalInfo.nationality}
                                onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                                disabled={!editMode.personalInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-sm border border-gray-400 rounded-2xl mb-8">
                    <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
                        <h2 className="font-semibold text-gray-800 text-lg">
                            Contact Information
                        </h2>
                        <button
                            onClick={() => handleEdit('contactInfo')}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                            <Pencil size={16} /> Edit
                        </button>
                    </div>

                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Street Address
                            </label>
                            <input
                                type="text"
                                value={formData.contactInfo.streetAddress}
                                onChange={(e) => handleInputChange('contactInfo', 'streetAddress', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                value={formData.contactInfo.city}
                                onChange={(e) => handleInputChange('contactInfo', 'city', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">State</label>
                            <input
                                type="text"
                                value={formData.contactInfo.state}
                                onChange={(e) => handleInputChange('contactInfo', 'state', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Country</label>
                            <input
                                type="text"
                                value={formData.contactInfo.country}
                                onChange={(e) => handleInputChange('contactInfo', 'country', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                            <input
                                type="text"
                                value={formData.contactInfo.zipCode}
                                onChange={(e) => handleInputChange('contactInfo', 'zipCode', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                LinkedIn Profile
                            </label>
                            <input
                                type="text"
                                value={formData.contactInfo.linkedIn}
                                onChange={(e) => handleInputChange('contactInfo', 'linkedIn', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Github Profile
                            </label>
                            <input
                                type="text"
                                value={formData.contactInfo.github}
                                onChange={(e) => handleInputChange('contactInfo', 'github', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Portfolio URL
                            </label>
                            <input
                                type="text"
                                value={formData.contactInfo.portfolio}
                                onChange={(e) => handleInputChange('contactInfo', 'portfolio', e.target.value)}
                                disabled={!editMode.contactInfo}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-sm border border-gray-400 rounded-2xl mb-8">
                    <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
                        <h2 className="font-semibold text-gray-800 text-lg">
                            Education
                        </h2>
                        <button
                            onClick={() => handleEdit('education')}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                            <Pencil size={16} /> Edit
                        </button>
                    </div>

                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Degree
                            </label>
                            <input
                                type="text"
                                value={formData.education.degree}
                                onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
                                disabled={!editMode.education}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Field of study</label>
                            <input
                                type="text"
                                value={formData.education.fieldOfStudy}
                                onChange={(e) => handleInputChange('education', 'fieldOfStudy', e.target.value)}
                                disabled={!editMode.education}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Institution</label>
                            <input
                                type="text"
                                value={formData.education.institution}
                                onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
                                disabled={!editMode.education}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Start Year</label>
                            <input
                                type="text"
                                value={formData.education.startYear}
                                onChange={(e) => handleInputChange('education', 'startYear', e.target.value)}
                                disabled={!editMode.education}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">End Year</label>
                            <input
                                type="text"
                                value={formData.education.endYear}
                                onChange={(e) => handleInputChange('education', 'endYear', e.target.value)}
                                disabled={!editMode.education}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Grade
                            </label>
                            <input
                                type="text"
                                value={formData.education.grade}
                                onChange={(e) => handleInputChange('education', 'grade', e.target.value)}
                                disabled={!editMode.education}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-sm border border-gray-400 rounded-2xl mb-8">
                    <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
                        <h2 className="font-semibold text-gray-800 text-lg">Experience</h2>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={addNewExperience}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                Add New
                            </button>
                            <button
                                onClick={() => handleEdit('experience')}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                <Pencil size={16} /> Edit
                            </button>
                        </div>
                    </div>

                    {formData.experiences.map((experience, index) => (
                        <div key={experience.id} className={`${index > 0 ? 'border-t border-gray-300' : ''}`}>
                            {index > 0 && editMode.experience && (
                                <div className="flex justify-end px-5 pt-3">
                                    <button
                                        onClick={() => removeExperience(index)}
                                        className="text-red-600 hover:text-red-700">
                                        <X size={20} />
                                    </button>
                                </div>
                            )}
                            
                            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        value={experience.jobTitle}
                                        onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                                        disabled={!editMode.experience}
                                        placeholder={editMode.experience ? "Enter Job Title" : ""}
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                            }`}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        value={experience.companyName}
                                        onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                                        disabled={!editMode.experience}
                                        placeholder={editMode.experience ? "Enter Company Name" : ""}
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                            }`}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={experience.location}
                                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                        disabled={!editMode.experience}
                                        placeholder={editMode.experience ? "Enter Location" : ""}
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                            }`}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="text"
                                        value={experience.startDate}
                                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                        disabled={!editMode.experience}
                                        placeholder={editMode.experience ? "Enter Start Date" : ""}
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                            }`}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="text"
                                        value={experience.endDate}
                                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                        disabled={!editMode.experience}
                                        placeholder={editMode.experience ? "Enter End Date" : ""}
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                            }`}
                                    />
                                </div>

                                <div className="flex items-center gap-2 mt-6">
                                    <label className="text-sm font-medium text-gray-700">
                                        Is Current Job
                                    </label>
                                    <input
                                        type="checkbox"
                                        checked={experience.isCurrentJob}
                                        onChange={(e) => handleExperienceChange(index, 'isCurrentJob', e.target.checked)}
                                        disabled={!editMode.experience}
                                        className="toggle-checkbox h-5 w-5"
                                    />
                                </div>
                            </div>

                            <div className="px-5">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Description
                                </label>
                                <textarea
                                    rows="3"
                                    value={experience.description}
                                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                    disabled={!editMode.experience}
                                    placeholder={editMode.experience ? "Enter Description" : ""}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent resize-none'
                                        }`}
                                ></textarea>
                            </div>

                            <div className="px-5">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Achievements
                                </label>
                                <textarea
                                    rows="2"
                                    value={experience.achievements}
                                    onChange={(e) => handleExperienceChange(index, 'achievements', e.target.value)}
                                    disabled={!editMode.experience}
                                    placeholder={editMode.experience ? "Enter Achievements" : ""}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent resize-none'
                                        }`}
                                ></textarea>
                            </div>

                            <div className="px-5 mb-5">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Technologies
                                </label>
                                <input
                                    type="text"
                                    value={experience.technologies}
                                    onChange={(e) => handleExperienceChange(index, 'technologies', e.target.value)}
                                    disabled={!editMode.experience}
                                    placeholder={editMode.experience ? "Enter Technologies" : ""}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white shadow-sm border border-gray-400 rounded-2xl mb-8">
                    <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
                        <h2 className="font-semibold text-gray-800 text-lg">
                            Documents & Portfolio
                        </h2>
                        <button
                            onClick={() => handleEdit('documents')}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                            <Pencil size={16} /> Edit
                        </button>
                    </div>

                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Upload Resume
                            </label>
                            <div className="flex items-center gap-2">
                                {uploadedFiles.resume && (
                                    <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 flex-1">
                                        <FileText size={16} className="text-gray-600" />
                                        <span className="text-xs text-gray-700 truncate">{uploadedFiles.resume.name}</span>
                                        <span className="text-xs text-gray-500">({uploadedFiles.resume.size})</span>
                                        <button
                                            onClick={() => handleFilePreview(uploadedFiles.resume.url)}
                                            className="text-blue-600 hover:text-blue-700 ml-auto"
                                            title="Preview">
                                            <Eye size={16} />
                                        </button>
                                        {editMode.documents && (
                                            <button
                                                onClick={() => handleFileDelete('resume')}
                                                className="text-red-600 hover:text-red-700"
                                                title="Delete">
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                )}
                                <input
                                    ref={resumeRef}
                                    type="file"
                                    id="resume"
                                    className="hidden"
                                    disabled={!editMode.documents}
                                    onChange={(e) => handleFileUpload(e, 'resume')}
                                    accept=".pdf,.doc,.docx"
                                />
                                <label
                                    htmlFor="resume"
                                    className={`border border-gray-400 rounded-md px-3 py-2 text-sm text-center transition ${editMode.documents ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'
                                        } ${uploadedFiles.resume ? 'min-w-[100px]' : 'flex-1'}`}
                                >
                                    Browse
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Upload Cover Letter
                            </label>
                            <div className="flex items-center gap-2">
                                {uploadedFiles.coverLetter && (
                                    <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 flex-1">
                                        <FileText size={16} className="text-gray-600" />
                                        <span className="text-xs text-gray-700 truncate">{uploadedFiles.coverLetter.name}</span>
                                        <span className="text-xs text-gray-500">({uploadedFiles.coverLetter.size})</span>
                                        <button
                                            onClick={() => handleFilePreview(uploadedFiles.coverLetter.url)}
                                            className="text-blue-600 hover:text-blue-700 ml-auto"
                                            title="Preview">
                                            <Eye size={16} />
                                        </button>
                                        {editMode.documents && (
                                            <button
                                                onClick={() => handleFileDelete('coverLetter')}
                                                className="text-red-600 hover:text-red-700"
                                                title="Delete">
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                )}
                                <input
                                    ref={coverLetterRef}
                                    type="file"
                                    id="coverLetter"
                                    className="hidden"
                                    disabled={!editMode.documents}
                                    onChange={(e) => handleFileUpload(e, 'coverLetter')}
                                    accept=".pdf,.doc,.docx"
                                />
                                <label
                                    htmlFor="coverLetter"
                                    className={`border border-gray-400 rounded-md px-3 py-2 text-sm text-center transition ${editMode.documents ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'
                                        } ${uploadedFiles.coverLetter ? 'min-w-[100px]' : 'flex-1'}`}
                                >
                                    Browse
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="px-5 pb-5">
                        <h3 className="font-semibold text-gray-800 mb-3">
                            Portfolio Projects
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.portfolio.projectTitle}
                                    onChange={(e) => handleInputChange('portfolio', 'projectTitle', e.target.value)}
                                    disabled={!editMode.documents}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.portfolio.projectUrl}
                                    onChange={(e) => handleInputChange('portfolio', 'projectUrl', e.target.value)}
                                    disabled={!editMode.documents}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                />
                            </div>

                            <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={formData.portfolio.projectDescription}
                                    onChange={(e) => handleInputChange('portfolio', 'projectDescription', e.target.value)}
                                    disabled={!editMode.documents}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-5 pb-5">
                        <h3 className="font-semibold text-gray-800 mb-3">Certificates</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.portfolio.certificateTitle}
                                    onChange={(e) => handleInputChange('portfolio', 'certificateTitle', e.target.value)}
                                    disabled={!editMode.documents}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Issue Date
                                </label>
                                <input
                                    type="text"
                                    value={formData.portfolio.issueDate}
                                    onChange={(e) => handleInputChange('portfolio', 'issueDate', e.target.value)}
                                    disabled={!editMode.documents}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Upload File
                                </label>
                                <div className="flex items-center gap-2">
                                    {uploadedFiles.certificate && (
                                        <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 flex-1">
                                            <FileText size={16} className="text-gray-600" />
                                            <span className="text-xs text-gray-700 truncate">{uploadedFiles.certificate.name}</span>
                                            <button
                                                onClick={() => handleFilePreview(uploadedFiles.certificate.url)}
                                                className="text-blue-600 hover:text-blue-700 ml-auto"
                                                title="Preview">
                                                <Eye size={14} />
                                            </button>
                                            {editMode.documents && (
                                                <button
                                                    onClick={() => handleFileDelete('certificate')}
                                                    className="text-red-600 hover:text-red-700"
                                                    title="Delete">
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    <input
                                        ref={certificateRef}
                                        type="file"
                                        id="certificate"
                                        className="hidden"
                                        disabled={!editMode.documents}
                                        onChange={(e) => handleFileUpload(e, 'certificate')}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                    <label
                                        htmlFor="certificate"
                                        className={`border border-gray-400 rounded-md px-3 py-2 text-sm text-center transition ${editMode.documents ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'
                                            } ${uploadedFiles.certificate ? 'min-w-[100px]' : 'flex-1'}`}
                                    >
                                        Upload
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-8 mb-4">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition shadow-md">
                        <Save size={20} /> Save Profile
                    </button>
                </div>
            </div>
        </section>
        </>
    )
}

export default CandidateProfile