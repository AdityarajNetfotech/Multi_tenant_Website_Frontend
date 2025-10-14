import { useState } from 'react';
import { Eye, Trash2, Users, SlidersHorizontal, Search } from 'lucide-react';
import Pagination from '../components/LandingPage/Pagination';

function RejisteredRecruiters() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegister, setSelectedRegister] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const registers = [
        {
            id: 1,
            companyName: 'Netfotech Solution',
            registerName: 'Sneha Singh',
            email: 'snehasingh147@gmail.com',
            phoneNumber: 'snehasingh147@gmail.com',
            companyType: 'Partnership'
        },
        {
            id: 2,
            companyName: 'Netfotech Solution',
            registerName: 'Sneha Singh',
            email: 'snehasingh147@gmail.com',
            phoneNumber: 'snehasingh147@gmail.com',
            companyType: 'Partnership'
        },
        {
            id: 3,
            companyName: 'Netfotech Solution',
            registerName: 'Sneha Singh',
            email: 'snehasingh147@gmail.com',
            phoneNumber: 'snehasingh147@gmail.com',
            companyType: 'Corporation'
        },
        {
            id: 4,
            companyName: 'Netfotech Solution',
            registerName: 'Sneha Singh',
            email: 'snehasingh147@gmail.com',
            phoneNumber: 'snehasingh147@gmail.com',
            companyType: 'Proprietorship'
        },
        {
            id: 5,
            companyName: 'Netfotech Solution',
            registerName: 'Sneha Singh',
            email: 'snehasingh147@gmail.com',
            phoneNumber: 'snehasingh147@gmail.com',
            companyType: 'Partnership'
        },
        {
            id: 6,
            companyName: 'Netfotech Solution',
            registerName: 'Sneha Singh',
            email: 'snehasingh147@gmail.com',
            phoneNumber: 'snehasingh147@gmail.com',
            companyType: 'Partnership'
        },
        {
            id: 7,
            companyName: 'Netfotech Solution',
            registerName: 'Sneha Singh',
            email: 'snehasingh147@gmail.com',
            phoneNumber: 'snehasingh147@gmail.com',
            companyType: 'Partnership'
        }
    ];

    const filteredRegisters = registers.filter(register =>
        register.id.toString().includes(searchTerm) ||
        register.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        register.registerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRegisters.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredRegisters.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const mockDetails = {
        id: 1,
        companyName: 'Netfotech Solutions',
        registerName: 'Sneha Singh',
        email: 'rajeshp@netfotech.in',
        phoneNumber: '9748049201',
        companyType: 'Partnership',
        contactPerson: 'Rajesh Pandi',
        employees: '120+',
        gstNumber: '27AAOFN2060P1ZQ',
        panNumber: 'AAOFN2060P',
        typeOfStaffing: 'Both',
        address1: 'World Trade Center, Tower 2, Level 9',
        address2: 'Opp : EON IT Park, Kharadi',
        city: 'Pune 411014',
        state: 'Maharashtra',
        logo: '',
        themeColors: ['#6B46C1', '#3B82F6', '#FFFFFF']
    };

    const getCompanyTypeColor = (type) => {
        switch (type) {
            case 'Partnership':
                return 'bg-green-100 text-green-700';
            case 'Corporation':
                return 'bg-orange-100 text-orange-700';
            case 'Proprietorship':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const handleViewDetails = () => {
        setSelectedRegister(mockDetails);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Register</h1>

                <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6 mb-6 inline-block">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-gray-900">{filteredRegisters.length}</div>
                            <div className="text-sm text-gray-500">Total Register</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="Search by ID, Company or Register Name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                        <SlidersHorizontal className="w-5 h-5" />
                        <span className="font-medium">Filters</span>
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-6 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">S.No</th>
                                    <th className="px-6 py-6 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Company Name</th>
                                    <th className="px-6 py-6 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Register Name</th>
                                    <th className="px-6 py-6 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Email</th>
                                    <th className="px-6 py-6 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Phone Number</th>
                                    <th className="px-6 py-6 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Company Type</th>
                                    <th className="px-6 py-6 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentItems.length > 0 ? (
                                    currentItems.map((register, index) => (
                                        <tr key={register.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}.</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{register.companyName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{register.registerName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{register.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{register.phoneNumber}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getCompanyTypeColor(register.companyType)}`}>
                                                    {register.companyType}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={handleViewDetails}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-blue-600 transition-colors"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded border border-red-600 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="px-3 py-1 text-sm text-green-700 bg-white hover:bg-green-50 rounded border border-green-700 transition-colors font-medium">
                                                        Approve
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            No records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {filteredRegisters.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>

            </div>

            {selectedRegister && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between py-4">
                            <h2 className="text-center w-full text-2xl font-bold text-gray-900">Information</h2>
                            <button
                                onClick={() => setSelectedRegister(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="px-6 space-y-6">
                            <div className="bg-[#E9E9E9D9] rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Company Name:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.companyName}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Contact Person:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.contactPerson}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Email:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.email}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Phone Number:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.phoneNumber}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Company Type:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.companyType}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">How many Employees do you have:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.employees}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">GST Number:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.gstNumber}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Pan Number:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.panNumber}</div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="text-sm text-gray-600 mb-1">Type of Staffing:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.typeOfStaffing}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Address 1:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.address1}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Address 2:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.address2}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">City:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.city}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">State:</div>
                                    <div className="text-sm font-semibold text-gray-900">{selectedRegister.state}</div>
                                </div>
                            </div>

                            <div className="bg-[#E9E9E9D9] mb-6 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="text-sm text-gray-600 mb-3">Logo:</div>
                                    <div className="bg-white rounded-lg p-6 flex items-center justify-center border border-gray-200">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg mx-auto mb-2"></div>
                                            <div className="text-xs text-gray-500">Netfotech Solutions</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-3">Theme Color:</div>
                                    <div className="flex gap-3">
                                        {selectedRegister.themeColors.map((color, index) => (
                                            <div
                                                key={index}
                                                className="w-20 h-20 rounded-lg border border-gray-200 shadow-sm"
                                                style={{ backgroundColor: color }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RejisteredRecruiters;