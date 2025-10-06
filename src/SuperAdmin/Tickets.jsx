import { Search, Filter, CreditCard as Edit2, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';

function Tickets() {
  const [currentPage, setCurrentPage] = useState(2);

  const tickets = [
    {
      id: '#245784',
      requestedBy: { name: 'Abhiraj D.', avatar: 'https://i.pravatar.cc/150?img=1' },
      subject: 'Support for theme',
      priority: 'Medium',
      status: 'Open',
      startDate: '12.04.2025',
      dueDate: '28.04.2025'
    },
    {
      id: '#245784',
      requestedBy: { name: 'Abhiraj D.', avatar: 'https://i.pravatar.cc/150?img=2' },
      subject: 'Support for theme',
      priority: 'Low',
      status: 'Closed',
      startDate: '12.04.2025',
      dueDate: '28.04.2025'
    },
    {
      id: '#245784',
      requestedBy: { name: 'Abhiraj D.', avatar: 'https://i.pravatar.cc/150?img=3' },
      subject: 'Support for theme',
      priority: 'High',
      status: 'Open',
      startDate: '12.04.2025',
      dueDate: '28.04.2025'
    },
    {
      id: '#245784',
      requestedBy: { name: 'Abhiraj D.', avatar: 'https://i.pravatar.cc/150?img=4' },
      subject: 'Support for theme',
      priority: 'Medium',
      status: 'Open',
      startDate: '12.04.2025',
      dueDate: '28.04.2025'
    },
    {
      id: '#245784',
      requestedBy: { name: 'Abhiraj D.', avatar: 'https://i.pravatar.cc/150?img=5' },
      subject: 'Support for theme',
      priority: 'Medium',
      status: 'Closed',
      startDate: '12.04.2025',
      dueDate: '28.04.2025'
    },
    {
      id: '#245784',
      requestedBy: { name: 'Abhiraj D.', avatar: 'https://i.pravatar.cc/150?img=6' },
      subject: 'Support for theme',
      priority: 'High',
      status: 'Open',
      startDate: '12.04.2025',
      dueDate: '28.04.2025'
    },
    {
      id: '#245784',
      requestedBy: { name: 'Abhiraj D.', avatar: 'https://i.pravatar.cc/150?img=7' },
      subject: 'Support for theme',
      priority: 'Low',
      status: 'Open',
      startDate: '12.04.2025',
      dueDate: '28.04.2025'
    }
  ];

  const stats = [
    { label: 'Total Tickets', value: '4004', icon: '🎫', bgColor: 'bg-blue-100', iconColor: 'text-blue-500' },
    { label: 'Pending Tickets', value: '4124', icon: '⏱️', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-500' },
    { label: 'Closed Tickets', value: '2487', icon: '✅', bgColor: 'bg-green-100', iconColor: 'text-green-500' },
    { label: 'Deleted Tickets', value: '5487', icon: '🗑️', bgColor: 'bg-red-100', iconColor: 'text-red-500' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Open'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-200 text-gray-700';
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Tickets</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-300 shadow-sm p-5 flex items-center space-x-4">
              <div className={`${stat.bgColor} p-3 rounded-[50%]`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by ID"
                className="w-full pl-4 pr-10 py-2 shadow-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 shadow-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested by</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {tickets.map((ticket, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-8 w-8 rounded-full" src={ticket.requestedBy.avatar} alt="" />
                        <span className="ml-3 text-sm text-gray-900">{ticket.requestedBy.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>




        <div className="mt-6 flex justify-center">

          <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm px-2 py-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <span className="text-sm">{'<'}</span>
            </button>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm ${currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(9, currentPage + 1))}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <span className="text-sm">{'>'}</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
