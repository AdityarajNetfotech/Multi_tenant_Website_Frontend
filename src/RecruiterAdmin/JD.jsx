import { useState } from 'react';
import { FileText, Filter, X, Eye, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from '../components/LandingPage/Pagination';
import { useNavigate } from 'react-router-dom';

function JD() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const rowsPerPage = 5;

  const stats = [
    { icon: FileText, label: 'Total JD', value: '404', bgColor: 'bg-amber-50', iconColor: 'text-amber-500' },
    { icon: Filter, label: 'Filtered Resumes', value: '317', bgColor: 'bg-blue-50', iconColor: 'text-blue-500' },
    { icon: X, label: 'Unfiltered Resumes', value: '173', bgColor: 'bg-red-50', iconColor: 'text-red-500' },
  ];

  const tableData = [
    { id: '#145796', company: 'Netflexch Solution', jobTitle: 'QA Cypress + Java', createdOn: '1/09/2025', skills: 'View', filtered: '24', unfiltered: '44' },
    { id: '#145786', company: 'Netflexch Solution', jobTitle: 'QA Cypress + Java', createdOn: '1/09/2025', skills: 'View', filtered: '24', unfiltered: '44' },
    { id: '#145756', company: 'Netflexch Solution', jobTitle: 'QA Cypress + Java', createdOn: '1/09/2025', skills: 'View', filtered: '24', unfiltered: '44' },
    { id: '#145768', company: 'Netflexch Solution', jobTitle: 'QA Cypress + Java', createdOn: '1/09/2025', skills: 'View', filtered: '24', unfiltered: '44' },
    { id: '#145796', company: 'Netflexch Solution', jobTitle: 'QA Cypress + Java', createdOn: '1/09/2025', skills: 'View', filtered: '24', unfiltered: '44' },
    { id: '#145797', company: 'Netflexch Solution', jobTitle: 'Frontend Developer', createdOn: '2/09/2025', skills: 'View', filtered: '30', unfiltered: '50' },
    { id: '#145798', company: 'Netflexch Solution', jobTitle: 'Backend Developer', createdOn: '3/09/2025', skills: 'View', filtered: '28', unfiltered: '46' },
    { id: '#145799', company: 'Netflexch Solution', jobTitle: 'Full Stack Developer', createdOn: '4/09/2025', skills: 'View', filtered: '35', unfiltered: '55' },
    { id: '#145800', company: 'Netflexch Solution', jobTitle: 'DevOps Engineer', createdOn: '5/09/2025', skills: 'View', filtered: '22', unfiltered: '40' },
    { id: '#145801', company: 'Netflexch Solution', jobTitle: 'Data Scientist', createdOn: '6/09/2025', skills: 'View', filtered: '26', unfiltered: '48' },
    { id: '#145802', company: 'Netflexch Solution', jobTitle: 'UI/UX Designer', createdOn: '7/09/2025', skills: 'View', filtered: '20', unfiltered: '38' },
    { id: '#145803', company: 'Netflexch Solution', jobTitle: 'Project Manager', createdOn: '8/09/2025', skills: 'View', filtered: '18', unfiltered: '35' },
  ];

  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
                <div className="flex items-center gap-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/RecruiterAdmin-Dashboard/JD/CreateJD")}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base shadow-sm"
          >
            <span className="text-lg">+</span>
            Create
          </button>
        </div>

        <div className="bg-white rounded-4xl shadow-sm border border-gray-300 overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Company</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Created On</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Skills</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Filtered</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Unfiltered</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">{row.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{row.company}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{row.jobTitle}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{row.createdOn}</td>
                    <td className="py-4 px-6">
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-1.5 rounded-2xl text-sm font-medium transition-colors">
                        {row.skills}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-medium">{row.filtered}</td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-medium">{row.unfiltered}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-1 border border-blue-500 rounded-lg transition-colors" aria-label="View">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1 border border-red-500 rounded-lg transition-colors" aria-label="Delete">
                          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
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
    </div>
  );
}

export default JD;