import { useEffect, useState } from 'react';
import { Trash2, Search, SlidersHorizontal, Eye } from 'lucide-react';
import Pagination from '../../components/LandingPage/Pagination';

function Report() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const itemsPerPage = 5;

  const candidatesData = [
    {
      id: '#145798',
      name: 'Aakash Singh',
      email: 'aakashsingh@gmail.com',
      company: 'Nerthwork Solution',
      jobTitle: 'QA Cypress + Java',
      totalQuestion: 12,
      marks: '52/60',
      skills: ['Wireframing', 'Prototyping', 'User Research'],
      time: 60,
      correct: 18,
      incorrect: 2,
    },
    {
      id: '#145799',
      name: 'Rahul Kumar',
      email: 'rahulkumar@gmail.com',
      company: 'Tech Solutions',
      jobTitle: 'Full Stack Developer',
      totalQuestion: 11,
      marks: '38/60',
      skills: ['React', 'Node', 'SQL'],
      time: 60,
    },
    {
      id: '#145800',
      name: 'Priya Sharma',
      email: 'priyasharma@gmail.com',
      company: 'Digital Innovations',
      jobTitle: 'UI/UX Designer',
      totalQuestion: 10,
      marks: '49/60',
      skills: ['Wireframing', 'Visual Design'],
      time: 60,
    },
    {
      id: '#145801',
      name: 'Vikram Patel',
      email: 'vikrampatel@gmail.com',
      company: 'Nerthwork Solution',
      jobTitle: 'Backend Developer',
      totalQuestion: 12,
      marks: '42/60',
      skills: ['Node', 'MongoDB', 'API'],
      time: 60,
    },
    {
      id: '#145802',
      name: 'Neha Gupta',
      email: 'nehagupta@gmail.com',
      company: 'Tech Corp',
      jobTitle: 'DevOps Engineer',
      totalQuestion: 10,
      marks: '33/60',
      skills: ['AWS', 'Docker', 'CI/CD'],
      time: 60,
    },
    {
      id: '#145803',
      name: 'Amit Verma',
      email: 'amitverma@gmail.com',
      company: 'Solutions Inc',
      jobTitle: 'Frontend Developer',
      totalQuestion: 10,
      marks: '45/60',
      skills: ['React', 'Tailwind'],
      time: 60,
    },
    {
      id: '#145804',
      name: 'Sonia Kapoor',
      email: 'soniakapoor@gmail.com',
      company: 'Digital Tech',
      jobTitle: 'Data Analyst',
      totalQuestion: 10,
      marks: '50/60',
      skills: ['SQL', 'Python'],
      time: 60,
    },
  ];

  const filteredCandidates = candidatesData.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredCandidates.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (!openModal) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenModal(false);
        setSelectedCandidate(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openModal]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-10">
        <div className="flex flex-col gap-3 p-3 rounded-lg w-[290px] border border-gray-300 shadow-md">
          <span className="font-medium text-3xl">Selected Candidate</span>
          <span className="text-4xl">1234</span>
        </div>
        <div className="flex flex-col gap-3 p-3 rounded-lg w-[290px] border border-gray-300 shadow-md">
          <span className="font-medium text-3xl">Failed Candidate</span>
          <span className="text-4xl">1234</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-300 p-4 md:p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Candidates</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:justify-end">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-3 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-0 top-0 h-full px-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-black text-white rounded-lg transition-colors hover:bg-gray-800 w-full sm:w-auto">
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-medium text-sm">Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 shadow-md rounded-2xl">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Job Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Question</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Marks</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((candidate, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm text-gray-800">{candidate.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{candidate.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{candidate.jobTitle}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{candidate.totalQuestion}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{candidate.marks}</td>
                    <td className="py-4 px-4 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setOpenModal(true);
                        }}
                        className="p-1.5 border border-blue-300 rounded hover:bg-blue-50"
                        aria-label="View Result"
                      >
                        <Eye size={16} className="text-blue-500" />
                      </button>
                      <button className="p-1.5 border border-red-300 rounded hover:bg-red-50" aria-label="Delete">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No candidates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
              }}
            />
          )}
        </div>
      </div>

      {openModal && selectedCandidate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40"
          onClick={() => {
            setOpenModal(false);
            setSelectedCandidate(null);
          }}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => {
                setOpenModal(false);
                setSelectedCandidate(null);
              }}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                <section className="col-span-1 rounded-xl border border-gray-200 p-4 sm:p-6 lg:col-span-2">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="min-w-[120px] text-gray-600">ID</span>
                      <span className="font-medium text-gray-900">{selectedCandidate.id}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="min-w-[120px] text-gray-600">Name</span>
                      <span className="font-medium text-gray-900">{selectedCandidate.name}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="min-w-[120px] text-gray-600">Job Title</span>
                      <span className="font-medium text-gray-900">{selectedCandidate.jobTitle}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="min-w-[120px] text-gray-600">Total Questions</span>
                      <span className="font-medium text-gray-900">{selectedCandidate.totalQuestion} Questions</span>
                    </div>
                    
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="min-w-[120px] text-gray-600">Marks</span>
                      <span className="font-semibold text-green-600">
                        {selectedCandidate.marks ? selectedCandidate.marks.split('/')[0] : 0}/{selectedCandidate.marks ? selectedCandidate.marks.split('/')[1] : 0}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-start gap-2">
                      <span className="min-w-[120px] text-gray-600">Skills</span>
                      <div className="flex flex-wrap gap-2">
                        {(selectedCandidate.skills?.length ? selectedCandidate.skills : ['Wireframing', 'Prototyping', 'User Research']).map((s, i) => (
                          <span key={`${s}-${i}`} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="min-w-[120px] text-gray-600">Correct Answer</span>
                      <span className="font-medium text-gray-900">{selectedCandidate.correct ?? '—'}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="min-w-[120px] text-gray-600">Incorrect Answer</span>
                      <span className="font-medium text-gray-900">{selectedCandidate.incorrect ?? '—'}</span>
                    </div>

                    <div className="pt-2">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-gray-700">Percentage</span>
                        <span className="font-semibold text-green-600">
                          {(() => {
                            const scored = Number(selectedCandidate.marks?.split('/')[0]) || 0;
                            const max = Number(selectedCandidate.marks?.split('/')[1]) || 0;
                            return max ? Math.round((scored / max) * 100) : 0;
                          })()}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div 
                          className="h-full rounded-full bg-green-500" 
                          style={{ 
                            width: `${(() => {
                              const scored = Number(selectedCandidate.marks?.split('/')[0]) || 0;
                              const max = Number(selectedCandidate.marks?.split('/')[1]) || 0;
                              return max ? Math.round((scored / max) * 100) : 0;
                            })()}%` 
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
                    <p className="text-base font-semibold text-gray-800">Total Marks</p>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-blue-600 sm:text-5xl">
                      {selectedCandidate.marks ? `${selectedCandidate.marks.split('/')[0]}/${selectedCandidate.marks.split('/')[1]}` : '0/0'}
                    </p>
                  </div>
                  
                  <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
                    <p className="text-base font-semibold text-gray-800">Time</p>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-blue-600 sm:text-5xl">
                      {selectedCandidate.time ?? 60} min
                    </p>
                  </div>
                  
                  <div className="rounded-xl border border-gray-200 p-4 sm:p-6">
                    <p className="text-base font-semibold text-gray-800">Total Questions</p>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-blue-600 sm:text-5xl">
                      {selectedCandidate.totalQuestion ?? '-'}
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;