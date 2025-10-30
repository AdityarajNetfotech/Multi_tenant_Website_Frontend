import React, { useState, useEffect } from 'react';
import { Search, Trash2, Eye, EyeOff, User, SlidersVertical } from 'lucide-react';
import Pagination from '../../components/LandingPage/Pagination';

function RecruiterManagement() {
  const [recruiters, setRecruiters] = useState([
    { id: 1, name: 'Aniket Sharma', email: 'aniketsharma1@gmail.com', phone: '9876543210', status: 'Active', registerId: '#3244578', registerDate: '10 Apr, 2024', lastLogin: '10 Mar, 2024', associates: ['Priya Das', 'Neha Sharma'] },
    { id: 2, name: 'Priya Verma', email: 'priyaverma@gmail.com', phone: '9876543211', status: 'Active', registerId: '#3244579', registerDate: '11 Apr, 2024', lastLogin: '11 Mar, 2024', associates: ['Rahul Kumar', 'Amit Singh'] },
    { id: 3, name: 'Rahul Singh', email: 'rahulsingh@gmail.com', phone: '9876543212', status: 'Inactive', registerId: '#3244580', registerDate: '12 Apr, 2024', lastLogin: '12 Mar, 2024', associates: ['Sonia Kapoor'] },
    { id: 4, name: 'Neha Gupta', email: 'nehagupta@gmail.com', phone: '9876543213', status: 'Active', registerId: '#3244581', registerDate: '13 Apr, 2024', lastLogin: '13 Mar, 2024', associates: ['Vikram Patel', 'Karan Malhotra'] },
    { id: 5, name: 'Amit Kumar', email: 'amitkumar@gmail.com', phone: '9876543214', status: 'Active', registerId: '#3244582', registerDate: '14 Apr, 2024', lastLogin: '14 Mar, 2024', associates: ['Meera Reddy'] },
    { id: 6, name: 'Pooja Sharma', email: 'poojasharma@gmail.com', phone: '9876543215', status: 'Active', registerId: '#3244583', registerDate: '15 Apr, 2024', lastLogin: '15 Mar, 2024', associates: ['Deepak Yadav', 'Anjali Mehta'] },
    { id: 7, name: 'Vikram Patel', email: 'vikrampatel@gmail.com', phone: '9876543216', status: 'Inactive', registerId: '#3244584', registerDate: '16 Apr, 2024', lastLogin: '16 Mar, 2024', associates: ['Neha Gupta'] },
    { id: 8, name: 'Anjali Mehta', email: 'anjalimehta@gmail.com', phone: '9876543217', status: 'Active', registerId: '#3244585', registerDate: '17 Apr, 2024', lastLogin: '17 Mar, 2024', associates: ['Pooja Sharma', 'Sonia Kapoor'] },
    { id: 9, name: 'Karan Malhotra', email: 'karanmalhotra@gmail.com', phone: '9876543218', status: 'Active', registerId: '#3244586', registerDate: '18 Apr, 2024', lastLogin: '18 Mar, 2024', associates: ['Rahul Singh'] },
    { id: 10, name: 'Sonia Kapoor', email: 'soniakapoor@gmail.com', phone: '9876543219', status: 'Active', registerId: '#3244587', registerDate: '19 Apr, 2024', lastLogin: '19 Mar, 2024', associates: ['Amit Kumar', 'Priya Verma'] },
    { id: 11, name: 'Deepak Yadav', email: 'deepakyadav@gmail.com', phone: '9876543220', status: 'Inactive', registerId: '#3244588', registerDate: '20 Apr, 2024', lastLogin: '20 Mar, 2024', associates: ['Aniket Sharma'] },
    { id: 12, name: 'Meera Reddy', email: 'meerareddy@gmail.com', phone: '9876543221', status: 'Active', registerId: '#3244589', registerDate: '21 Apr, 2024', lastLogin: '21 Mar, 2024', associates: ['Karan Malhotra', 'Vikram Patel'] },
  ]);

  const activities = [
    { date: "10 Apr, 2024", action: "RMG Aniket Sharma Created", by: "Admin" },
    { date: "10 Apr, 2024", action: "RMG Aniket Sharma Deactivated", by: "Admin" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const itemsPerPage = 5;

  const filteredRecruiters = recruiters.filter(recruiter =>
    recruiter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recruiter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recruiter.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredRecruiters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecruiters = filteredRecruiters.slice(startIndex, endIndex);

  useEffect(() => {
    if (recruiters.length > 0 && !selectedRecruiter) {
      setSelectedRecruiter(recruiters[0]);
    }
  }, [recruiters, selectedRecruiter]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (id) => {
    setRecruiters(recruiters.filter(r => r.id !== id));
    if (selectedRecruiter?.id === id) {
      const remaining = recruiters.filter(r => r.id !== id);
      setSelectedRecruiter(remaining.length > 0 ? remaining[0] : null);
    }
    const newFilteredLength = recruiters.filter(r => r.id !== id).length;
    const newTotalPages = Math.ceil(newFilteredLength / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const handleViewDetails = (recruiter) => {
    setSelectedRecruiter(recruiter);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newRecruiter = {
      id: recruiters.length + 1,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      status: 'Active',
      registerId: `#324459${recruiters.length}`,
      registerDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      lastLogin: 'Just now',
      associates: []
    };
    setRecruiters([...recruiters, newRecruiter]);
    setFormData({ fullName: '', email: '', phone: '', password: '' });
    setShowAddForm(false); 
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <>
      <div className="min-h-screen">
        <div className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className='rounded-2xl shadow-md border border-gray-300 flex-1'>
              <div className=" m-4 md:m-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="relative w-full sm:w-96">
                    <input
                      type="text"
                      placeholder="Search by Name, Email or Phone"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <button className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={toggleAddForm}
                      className="flex-1 sm:flex-none px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      {showAddForm ? 'Hide Form' : 'Add New'}
                    </button>
                    <button className="flex gap-1 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                      <SlidersVertical />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Email</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Phone</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentRecruiters.length > 0 ? (
                        currentRecruiters.map((recruiter, index) => (
                          <tr key={recruiter.id} className={index % 2 === 0 ? 'bg-blue-50/30' : 'bg-white'}>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{recruiter.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{recruiter.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{recruiter.phone}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                              <span
                                className={`font-medium ${recruiter.status === 'Active' ? 'text-green-600' : 'text-red-600'
                                  }`}
                              >
                                {recruiter.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleViewDetails(recruiter)}
                                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                  onClick={() => handleDelete(recruiter.id)}
                                  className="p-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            No recruiters found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {filteredRecruiters.length > 0 && (
                  <div className="border-t border-gray-200">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </div>

            {selectedRecruiter && (
              <div className="bg-white shadow-md rounded-2xl border border-gray-300 p-5 w-full lg:w-[250px] h-fit">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-900 text-lg truncate">{selectedRecruiter.name}</h2>
                    <p className="text-gray-500 text-sm truncate">{selectedRecruiter.email}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium text-gray-800">ID :</span> {selectedRecruiter.registerId}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Register Date :</span> {selectedRecruiter.registerDate}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Last Login :</span> {selectedRecruiter.lastLogin}
                  </p>
                </div>

                <hr className="my-4 border-gray-300" />

                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Associate Recruiters</h3>
                  {selectedRecruiter.associates && selectedRecruiter.associates.length > 0 ? (
                    selectedRecruiter.associates.map((associate, index) => (
                      <p key={index} className="text-gray-700 text-sm">{associate}</p>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No associates</p>
                  )}
                </div>

                <div className="flex justify-between mt-6 gap-2">
                  <button className={`border ${selectedRecruiter.status === 'Active' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'} px-4 py-2 rounded-md font-medium hover:bg-opacity-10 transition flex-1`}>
                    {selectedRecruiter.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition flex-1">
                    Edit RMG
                  </button>
                </div>
              </div>
            )}
          </div>

          {showAddForm && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Recruiters</h2>
              <form onSubmit={handleSave} className="space-y-5">
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
                    <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full md:w-32 px-8 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="w-full ">
            <h1 className='text-3xl font-medium pl-1 mb-4'>Activity Logs</h1>
              <div className="w-full space-y-3">
                {activities.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 shadow-md rounded-2xl flex justify-between items-center px-6 py-4"
                  >
                    <span className="text-gray-700 font-medium w-1/3">{item.date}</span>
                    <span className="text-gray-800 font-medium text-center flex-1">{item.action}</span>
                    <span className="text-gray-700 font-semibold text-right w-1/4">{item.by}</span>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecruiterManagement