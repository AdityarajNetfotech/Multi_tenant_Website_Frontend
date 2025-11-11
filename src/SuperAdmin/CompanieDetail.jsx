import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CompanyDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const tenant = location.state?.tenant;
    console.log(tenant);
    

    useEffect(() => {
        if (!tenant) {
            navigate('/companies');
        }
    }, [tenant, navigate]);

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

    if (!tenant) {
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
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Details</h2>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-2xl">
                            {getInitial(tenant.companyName)}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {tenant.companyName || 'N/A'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {tenant.subdomain ? `Subdomain: ${tenant.subdomain}` : ''}
                        </p>
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
                                value={formatDate(tenant.createdAt)}
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
                                value={calculateValidTill(tenant.createdAt)}
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
                                value={tenant.createdBy?.name || 'N/A'}
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
                                value={tenant.phone || 'N/A'}
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Booking Date
                            </label>
                            <input
                                type="text"
                                value={formatDate(tenant.subscription?.startDate || tenant.createdAt)}
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
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                        tenant.subscription?.status === 'active' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {tenant.subscription?.plan || 'Free Trial'} - {tenant.subscription?.status || 'N/A'}
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
                                value={tenant.email || 'N/A'}
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Admin Username
                            </label>
                            <input
                                type="text"
                                value={tenant.adminCredentials?.username || 'N/A'}
                                readOnly
                                className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-50"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Address
                            </label>
                            <div className="border rounded-lg px-3 py-2 bg-gray-50">
                                <p className="text-gray-700">
                                    {tenant.address?.street || ''}{tenant.address?.street ? ', ' : ''}
                                    {tenant.address?.city || ''}{tenant.address?.city ? ', ' : ''}
                                    {tenant.address?.state || ''}{tenant.address?.state ? ', ' : ''}
                                    {tenant.address?.country || ''}{tenant.address?.country ? ' - ' : ''}
                                    {tenant.address?.zipCode || ''}
                                </p>
                                {!tenant.address?.street && !tenant.address?.city && (
                                    <p className="text-gray-500">No address provided</p>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Settings & Limits
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="border rounded-lg px-3 py-2 bg-gray-50">
                                    <p className="text-xs text-gray-500">Max Users</p>
                                    <p className="font-semibold">{tenant.subscription?.maxUsers || 'N/A'}</p>
                                </div>
                                <div className="border rounded-lg px-3 py-2 bg-gray-50">
                                    <p className="text-xs text-gray-500">Max Recruiters</p>
                                    <p className="font-semibold">{tenant.subscription?.maxRecruiters || 'N/A'}</p>
                                </div>
                                <div className="border rounded-lg px-3 py-2 bg-gray-50">
                                    <p className="text-xs text-gray-500">Max Applications/Candidate</p>
                                    <p className="font-semibold">{tenant.settings?.maxApplicationsPerCandidate || 'N/A'}</p>
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