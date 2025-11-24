import axios from 'axios';
import React, { useState, useEffect } from 'react';

function AddNewRecruiter({ onSave, onCancel, editData }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyId: '691ae85a4dbdd8a81680459e'
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                fullName: editData.name || '',
                email: editData.email || '',
                phone: editData.phone || '',
                companyId: editData.company || '691ae85a4dbdd8a81680459e'
            });
        } else {
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                companyId: '691ae85a4dbdd8a81680459e'
            });
        }
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editData) {
                const response = await axios.put(
                    `http://localhost:4000/api/admin/hr/${editData.id}`,
                    {
                        name: formData.fullName,
                        phone: formData.phone,
                        email: formData.email,
                        company: formData.companyId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                if (response.data.success) {
                    alert("HR updated successfully!");
                    onSave({
                        ...response.data.data,
                        fullName: response.data.data.name
                    });
                }
            } else {
                const response = await axios.post('http://localhost:4000/api/admin/hr', {
                    name: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    company: formData.companyId
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                alert("HR created successfully!");
                onSave(response.data);
            }

            setFormData({
                fullName: '',
                email: '',
                phone: '',
                companyId: '691ae85a4dbdd8a81680459e'
            });

        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || `Failed to ${editData ? 'update' : 'create'} HR`);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editData ? 'Edit Recruiter' : 'Add Recruiters'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Email ID</label>
                        <input
                            type="email"
                            placeholder="Enter Email ID"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Company ID</label>
                        <input
                            type="text"
                            value={formData.companyId}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                        >
                            {editData ? 'Update' : 'Save'}
                        </button>
                        {onCancel && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-8 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddNewRecruiter;