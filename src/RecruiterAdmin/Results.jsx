import { useState } from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';
import Pagination from '../components/LandingPage/Pagination';
import ViewResults from './ViewResults'; 

function Results() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewResults, setShowViewResults] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const rowsPerPage = 5;

  const jobs = [
    { id: 1, jobId: '#124578', jobTitle: 'Full Stack Developer', totalCandidates: 44, testDate: '25.04.2025' },
    { id: 2, jobId: '#124578', jobTitle: 'Frontend Developer', totalCandidates: 35, testDate: '27.04.2025' },
    { id: 3, jobId: '#124578', jobTitle: 'Backend Developer', totalCandidates: 28, testDate: '30.04.2025' },
    { id: 4, jobId: '#124578', jobTitle: 'UI/UX Designer', totalCandidates: 18, testDate: null },
    { id: 5, jobId: '#124578', jobTitle: 'React Developer', totalCandidates: 24, testDate: '25.04.2025' },
    { id: 6, jobId: '#124578', jobTitle: 'Node.js Developer', totalCandidates: 31, testDate: null },
    { id: 7, jobId: '#124578', jobTitle: 'QA Engineer', totalCandidates: 20, testDate: '02.05.2025' },
    { id: 8, jobId: '#124578', jobTitle: 'DevOps Engineer', totalCandidates: 15, testDate: '05.05.2025' },
    { id: 6, jobId: '#124578', jobTitle: 'Node.js Developer', totalCandidates: 31, testDate: null },
    { id: 7, jobId: '#124578', jobTitle: 'QA Engineer', totalCandidates: 20, testDate: '02.05.2025' },
    { id: 8, jobId: '#124578', jobTitle: 'DevOps Engineer', totalCandidates: 15, testDate: '05.05.2025' },
  ];

  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredJobs.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredJobs.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewResults = (job) => {
    setSelectedJob(job);
    setShowViewResults(true);
  };

  const closeModal = () => {
    setShowViewResults(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-8">

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-1">
            <div className="bg-blue-100 rounded-2xl p-6 sm:p-8 shadow-sm flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Total Jobs</h2>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600">{jobs.length}</p>
            </div>

            <div className="bg-green-100 rounded-2xl p-6 sm:p-8 shadow-sm flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Total Candidates</h2>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600">
                {jobs.reduce((sum, j) => sum + j.totalCandidates, 0)}
              </p>
            </div>
          </div>

          <div className="flex items-end">
            <div className="relative w-full sm:w-[280px]">
              <input
                type="text"
                placeholder="Search by Job Title"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Search size={20} />
              </button>

            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">

            <table className="w-full min-w-[640px]">
                
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">S.No</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Job ID</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Job Title</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Total Candidate</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Test Date</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((job, index) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-300">
                        {(indexOfFirstRow + index + 1)}.
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-300">{job.jobId}</td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-300">{job.jobTitle}</td>
                      <td className="px-4 py-4 border-b border-gray-300">
                        <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1 bg-green-200 text-green-800 text-sm font-medium rounded-full">
                          {job.totalCandidates}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-300">
                        {job.testDate || 'N/A'}
                      </td>
                      <td className="px-4 py-4 border-b border-gray-300">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewResults(job)}
                            className="p-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition-colors"
                            aria-label="View job"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="p-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition-colors"
                            aria-label="Delete job"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No jobs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>


      {showViewResults && (
        <ViewResults 
          jobData={selectedJob} 
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Results;