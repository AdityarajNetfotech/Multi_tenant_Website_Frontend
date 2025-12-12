import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Save, X } from "lucide-react";
import axios from "axios";

const CompanyDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [company, setCompany] = useState(location.state?.company || null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!company) {
            navigate('/SuperAdmin-Dashboard/Companies');
        } else {
            setFormData({
                id: company._id,
                companyName: company.companyName || '',
                phone: company.phone || '',
                email: company.email || '',
                address: {
                    street: company.address?.street || '',
                    city: company.address?.city || '',
                    state: company.address?.state || '',
                    country: company.address?.country || '',
                    zipCode: company.address?.zipCode || ''
                },
                subscription: {
                    maxUsers: company.subscription?.maxUsers || '',
                    maxRecruiters: company.subscription?.maxRecruiters || ''
                },
                settings: {
                    maxApplicationsPerCandidate: company.settings?.maxApplicationsPerCandidate || ''
                }
            });
        }
    }, [company, navigate]);

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(
                `http://localhost:5000/api/super-admin/tenants/${company._id}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);

            if (response.data.success) {
                setCompany(response.data.data.tenant);
                setIsEditing(false);
                alert('Company details updated successfully!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating company details');
            console.error('Update error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError("");
        setFormData({
            companyName: company.companyName || '',
            phone: company.phone || '',
            email: company.email || '',
            address: {
                street: company.address?.street || '',
                city: company.address?.city || '',
                state: company.address?.state || '',
                country: company.address?.country || '',
                zipCode: company.address?.zipCode || ''
            },
            subscription: {
                maxUsers: company.subscription?.maxUsers || '',
                maxRecruiters: company.subscription?.maxRecruiters || ''
            },
            settings: {
                maxApplicationsPerCandidate: company.settings?.maxApplicationsPerCandidate || ''
            }
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '.');
    };

    const calculateValidTill = (createdAt) => {
        if (!createdAt) return '-';
        const date = new Date(createdAt);
        date.setMonth(date.getMonth() + 3);
        return formatDate(date);
    };

    const getInitial = (name) => {
        return name?.charAt(0)?.toUpperCase() || 'N';
    };

    if (!company) {
        return (
            <div className="max-w-5xl mx-auto p-6">
                <div className="flex items-center justify-center py-20">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Companies
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Company Details</h2>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-2xl">
                            {getInitial(isEditing ? formData.companyName : company.companyName)}
                        </span>
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                className="text-lg font-semibold text-gray-900 border rounded-lg px-3 py-2 w-full"
                                placeholder="Company Name"
                            />
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {company.companyName || 'N/A'}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {company.subdomain ? `Subdomain: ${company.subdomain}` : ''}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Registration Date
                            </label>
                            <input
                                type="text"
                                value={formatDate(company.createdAt)}
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
                                value={calculateValidTill(company.createdAt)}
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
                                value={company.createdBy?.name || 'N/A'}
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
                                value={isEditing ? formData.phone : company.phone || 'N/A'}
                                onChange={isEditing ? (e) => handleInputChange('phone', e.target.value) : undefined}
                                readOnly={!isEditing}
                                className={`mt-1 w-full border rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Booking Date
                            </label>
                            <input
                                type="text"
                                value={formatDate(company.subscription?.startDate || company.createdAt)}
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
                                    Subscription Plan
                                </label>
                                <div className="mt-1">
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${company.subscription?.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {company.subscription?.plan || 'Free Trial'} - {company.subscription?.status || 'N/A'}
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
                                value={isEditing ? formData.email : company.email || 'N/A'}
                                onChange={isEditing ? (e) => handleInputChange('email', e.target.value) : undefined}
                                readOnly={!isEditing}
                                className={`mt-1 w-full border rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Admin Username
                            </label>
                            <input
                                type="text"
                                value={company.adminCredentials?.username || 'N/A'}
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Address
                            </label>
                            {isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        value={formData.address.street}
                                        onChange={(e) => handleInputChange('address.street', e.target.value)}
                                        className="border rounded-lg px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="City"
                                        value={formData.address.city}
                                        onChange={(e) => handleInputChange('address.city', e.target.value)}
                                        className="border rounded-lg px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={formData.address.state}
                                        onChange={(e) => handleInputChange('address.state', e.target.value)}
                                        className="border rounded-lg px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Country"
                                        value={formData.address.country}
                                        onChange={(e) => handleInputChange('address.country', e.target.value)}
                                        className="border rounded-lg px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Zip Code"
                                        value={formData.address.zipCode}
                                        onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                                        className="border rounded-lg px-3 py-2"
                                    />
                                </div>
                            ) : (
                                <div className="border rounded-lg px-3 py-2 bg-gray-50">
                                    <p className="text-gray-700">
                                        {company.address?.street || ''}{company.address?.street ? ', ' : ''}
                                        {company.address?.city || ''}{company.address?.city ? ', ' : ''}
                                        {company.address?.state || ''}{company.address?.state ? ', ' : ''}
                                        {company.address?.country || ''}{company.address?.country ? ' - ' : ''}
                                        {company.address?.zipCode || ''}
                                    </p>
                                    {!company.address?.street && !company.address?.city && (
                                        <p className="text-gray-500">No address provided</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Settings & Limits
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className={`border rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}>
                                    <p className="text-xs text-gray-500">Max Users</p>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={formData.subscription.maxUsers}
                                            onChange={(e) => handleInputChange('subscription.maxUsers', e.target.value)}
                                            className="font-semibold w-full border-0 focus:outline-none"
                                        />
                                    ) : (
                                        <p className="font-semibold">{company.subscription?.maxUsers || 'N/A'}</p>
                                    )}
                                </div>
                                <div className={`border rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}>
                                    <p className="text-xs text-gray-500">Max Recruiters</p>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={formData.subscription.maxRecruiters}
                                            onChange={(e) => handleInputChange('subscription.maxRecruiters', e.target.value)}
                                            className="font-semibold w-full border-0 focus:outline-none"
                                        />
                                    ) : (
                                        <p className="font-semibold">{company.subscription?.maxRecruiters || 'N/A'}</p>
                                    )}
                                </div>
                                <div className={`border rounded-lg px-3 py-2 ${isEditing ? 'bg-white' : 'bg-gray-50'}`}>
                                    <p className="text-xs text-gray-500">Max Applications/Candidate</p>
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={formData.settings.maxApplicationsPerCandidate}
                                            onChange={(e) => handleInputChange('settings.maxApplicationsPerCandidate', e.target.value)}
                                            className="font-semibold w-full border-0 focus:outline-none"
                                        />
                                    ) : (
                                        <p className="font-semibold">{company.settings?.maxApplicationsPerCandidate || 'N/A'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;