import React, { useState } from 'react'
import { Pencil, Trash2, Upload, Save } from "lucide-react";

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
        experience: {
            jobTitle: "Senior Software Engineer",
            companyName: "Tech Solutions Inc.",
            location: "Mumbai",
            startDate: "2018-07",
            endDate: "2023-12",
            isCurrentJob: false,
            description: "Led development of multiple web applications using React and Node.js",
            achievements: "Reduced application load time by 40%",
            technologies: "React, Node.js, MongoDB, AWS"
        },
        portfolio: {
            projectTitle: "E-commerce Platform",
            projectUrl: "https://myproject.com",
            projectDescription: "Full-stack e-commerce solution",
            certificateTitle: "AWS Certified Developer",
            issueDate: "2022-05"
        }
    };

    const [formData, setFormData] = useState(initialData);
    const [editMode, setEditMode] = useState({
        personalInfo: false,
        contactInfo: false,
        education: false,
        experience: false,
        documents: false
    });

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

    const handleSave = () => {
        console.log("Saving data:", formData);
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
            <section className='flex flex-wrap gap-2'>
                <div className="border max-w-2xl border-gray-400 shadow-xl rounded-3xl p-6 bg-gray-50 min-h-screen">
                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=387"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className='space-y-2'>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md transition">
                                    <Upload size={18} /> Upload Image
                                </button>
                                <button className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 font-medium px-4 py-2 rounded-md transition">
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <div className="flex gap-1">
                                    <select 
                                        disabled={!editMode.personalInfo}
                                        className={`rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-1/3 ${
                                            editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}>
                                        <option value="">+91</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={formData.personalInfo.phone}
                                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                                        disabled={!editMode.personalInfo}
                                        className={`rounded-md  py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 ${
                                            editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select 
                                    value={formData.personalInfo.gender}
                                    onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                                    disabled={!editMode.personalInfo}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.personalInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.contactInfo ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.education ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm border border-gray-400 rounded-2xl mb-8">
                        <div className="flex justify-between items-center border-b border-gray-400 px-5 py-3">
                            <h2 className="font-semibold text-gray-800 text-lg">Experience</h2>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    Add New
                                </button>
                                <button 
                                    onClick={() => handleEdit('experience')}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                                    <Pencil size={16} /> Edit
                                </button>
                            </div>
                        </div>

                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.experience.jobTitle}
                                    onChange={(e) => handleInputChange('experience', 'jobTitle', e.target.value)}
                                    disabled={!editMode.experience}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.experience.companyName}
                                    onChange={(e) => handleInputChange('experience', 'companyName', e.target.value)}
                                    disabled={!editMode.experience}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.experience.location}
                                    onChange={(e) => handleInputChange('experience', 'location', e.target.value)}
                                    disabled={!editMode.experience}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="text"
                                    value={formData.experience.startDate}
                                    onChange={(e) => handleInputChange('experience', 'startDate', e.target.value)}
                                    disabled={!editMode.experience}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="text"
                                    value={formData.experience.endDate}
                                    onChange={(e) => handleInputChange('experience', 'endDate', e.target.value)}
                                    disabled={!editMode.experience}
                                    className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                        editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                    }`}
                                />
                            </div>

                            <div className="flex items-center gap-2 mt-6">
                                <label className="text-sm font-medium text-gray-700">
                                    Is Current Job
                                </label>
                                <input 
                                    type="checkbox" 
                                    checked={formData.experience.isCurrentJob}
                                    onChange={(e) => handleInputChange('experience', 'isCurrentJob', e.target.checked)}
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
                                value={formData.experience.description}
                                onChange={(e) => handleInputChange('experience', 'description', e.target.value)}
                                disabled={!editMode.experience}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                    editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent resize-none'
                                }`}
                            ></textarea>
                        </div>

                        <div className="px-5">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Achievements
                            </label>
                            <textarea
                                rows="2"
                                value={formData.experience.achievements}
                                onChange={(e) => handleInputChange('experience', 'achievements', e.target.value)}
                                disabled={!editMode.experience}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                    editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent resize-none'
                                }`}
                            ></textarea>
                        </div>

                        <div className="px-5 mb-5">
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Technologies
                            </label>
                            <input
                                type="text"
                                value={formData.experience.technologies}
                                onChange={(e) => handleInputChange('experience', 'technologies', e.target.value)}
                                disabled={!editMode.experience}
                                className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                    editMode.experience ? 'border border-gray-400' : 'border-0 bg-transparent'
                                }`}
                            />
                        </div>
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
                                <input
                                    type="file"
                                    id="resume"
                                    className="hidden"
                                    disabled={!editMode.documents}
                                />
                                <label
                                    htmlFor="resume"
                                    className={`border border-gray-400 rounded-md px-3 py-2 text-sm text-center transition ${
                                        editMode.documents ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'
                                    }`}
                                >
                                    Browse
                                </label>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Upload Cover Letter
                                </label>
                                <input
                                    type="file"
                                    id="coverLetter"
                                    className="hidden"
                                    disabled={!editMode.documents}
                                />
                                <label
                                    htmlFor="coverLetter"
                                    className={`border border-gray-400 rounded-md px-3 py-2 text-sm text-center transition ${
                                        editMode.documents ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'
                                    }`}
                                >
                                    Browse
                                </label>
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
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                            editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                            editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                            editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                            editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
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
                                        className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full ${
                                            editMode.documents ? 'border border-gray-400' : 'border-0 bg-transparent'
                                        }`}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-700 mb-1">
                                        Upload File
                                    </label>
                                    <input 
                                        type="file" 
                                        id="certificate" 
                                        className="hidden" 
                                        disabled={!editMode.documents}
                                    />
                                    <label
                                        htmlFor="certificate"
                                        className={`border border-gray-400 rounded-md px-3 py-2 text-sm text-center transition ${
                                            editMode.documents ? 'cursor-pointer hover:bg-gray-100' : 'cursor-not-allowed opacity-50'
                                        }`}
                                    >
                                        Upload
                                    </label>
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
                
                <div className="max-w-2xl bg-white border border-gray-400 rounded-2xl shadow-xl p-5 flex flex-col items-center h-[400px]">
                    <h2 className="font-semibold text-gray-800 mb-4 text-lg">Complete your Profile</h2>

                    {/* Circular Progress */}
                    <div className="relative w-28 h-28 mb-6">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path
                                className="text-gray-300"
                                strokeWidth="3"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="text-blue-500"
                                strokeWidth="3"
                                strokeDasharray="60, 100"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="none"
                                d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-800">
                            60%
                        </span>
                    </div>

                    <div className="space-y-2 text-sm w-full">
                        <div className="flex items-center gap-2 text-gray-800">
                            <span>✔️</span> <span>Setup account</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-800">
                            <span>✔️</span> <span>Upload your photo</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-800">
                            <span>✔️</span> <span>Personal Information</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-800">
                            <span>✔️</span> <span>Biography</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <span>✖️</span> <span>Notification</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CandidateProfile