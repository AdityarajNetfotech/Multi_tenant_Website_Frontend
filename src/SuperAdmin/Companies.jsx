import React, { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  TrendingUp,
  Eye,
  Trash2
} from 'lucide-react';
import Pagination from '../components/LandingPage/Pagination';
import { useNavigate } from 'react-router-dom';

const mockData = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  name: 'Netfotech Solutions',
  logo: '🏢',
  registration: '12.04.2025',
  booking: '12.04.2025',
  validTill: '12.07.2025',
  freeTrial: '3 Months'
}));

function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate()

  const filteredData = mockData.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">


        <div className="flex flex-col">
          <div className="bg-white rounded-xl w-full sm:w-[450px] shadow-sm border border-gray-200 p-6">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Total Companies</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-end gap-4">
              <span className="text-4xl font-bold text-gray-900">4004</span>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-md mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">12.50%</span>
              </div>
            </div>
          </div>


          <div className="mt-4 flex justify-end">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Company Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full shadow-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-1.5 rounded-md hover:bg-gray-800 transition-colors">
                <Search className="w-4 h-4" />
              </button>

            </div>
          </div>
        </div>
        
        <div className="shadow-sm border border-gray-200 rounded-3xl overflow-x-auto">
          <table className="min-w-[900px] w-full">

            <thead className="bg-gray-100 border border-gray-200 rounded-3xl">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Company Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Registration</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Booking</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Valid Till</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Free Trial</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((company, index) => (
                <tr
                  key={company.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">N</span>
                      </div>
                      <span className="font-medium text-gray-900">{company.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{company.registration}</td>
                  <td className="py-4 px-6 text-gray-600">{company.booking}</td>
                  <td className="py-4 px-6 text-gray-600">{company.validTill}</td>
                  <td className="py-4 px-6 text-gray-600">{company.freeTrial}</td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button onClick={()=>navigate("/SuperAdmin-Dashboard/Companies/CompanieDetail")} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors">
                        Alert
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Companies;