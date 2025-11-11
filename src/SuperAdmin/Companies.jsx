import React, { useState, useEffect } from 'react';
import {
  Search,
  MoreHorizontal,
  TrendingUp,
  Eye,
  Trash2,
  Loader2
} from 'lucide-react';
import Pagination from '../components/LandingPage/Pagination';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 5
  });

  const navigate = useNavigate();

  const getAuthToken = () => {
    return localStorage.getItem('token')
  };

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Authentication failed. Please login again.');
      }
      return Promise.reject(error);
    }
  );

  const fetchTenants = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: pagination.limit,
        search: searchQuery,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      };

      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });

      const response = await axiosInstance.get('/api/super-admin/tenants', { params });

      console.log('Tenants data:', response.data); 

      if (response.data.success) {
        setTenants(response.data.data.tenants || []);
        setPagination(response.data.data.pagination || {
          current: 1,
          pages: 1,
          total: 0,
          limit: 5
        });
      }
    } catch (err) {
      console.error('Error fetching tenants:', err);

      if (err.response?.status === 401) {
        setError('You are not authorized. Please login again.');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to fetch companies. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setError('Please login to view companies.');
      setLoading(false);
      return;
    }

    fetchTenants();
  }, [currentPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery !== undefined) {
        setCurrentPage(1);
        fetchTenants();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTenants();
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

  const calculateValidTill = (createdAt, plan) => {
    if (!createdAt) return '-';
    const date = new Date(createdAt);
    date.setMonth(date.getMonth() + 3);
    return formatDate(date);
  };

  const handleDelete = async (tenantId) => {
    if (!window.confirm('Are you sure you want to delete this company?')) {
      return;
    }

    try {
      const response = await axiosInstance.delete(`/api/super-admin/tenants/${tenantId}`);
      if (response.data.success) {
        fetchTenants();
      }
    } catch (error) {
      console.error('Error deleting tenant:', error);
      alert('Failed to delete company. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
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
              <span className="text-4xl font-bold text-gray-900">{pagination.total || 0}</span>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-md mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">12.50%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <form onSubmit={handleSearch} className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Company Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full shadow-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-1.5 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="shadow-sm border border-gray-200 rounded-3xl overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchTenants}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : !tenants || tenants.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">No companies found</p>
            </div>
          ) : (
            <>
              <table className="min-w-[900px] w-full">
                <thead className="bg-gray-50 border border-gray-200 rounded-3xl">
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
                  {tenants.map((tenant, index) => {
                    return (
                      <tr
                        key={tenant._id || index}
                        className='border-b border-gray-100 bg-white transition-colors'
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">
                                {tenant.companyName?.charAt(0)?.toUpperCase() || 'N'}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">{tenant.companyName || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{formatDate(tenant.createdAt)}</td>
                        <td className="py-4 px-6 text-gray-600">{formatDate(tenant.createdAt)}</td>
                        <td className="py-4 px-6 text-gray-600">{calculateValidTill(tenant.createdAt, tenant.subscription?.plan)}</td>
                        <td className="py-4 px-6 text-gray-600">3 Months</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate('CompanieDetail', { state: { tenant } })}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(tenant._id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors">
                              Alert
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {pagination.pages > 1 && (
                <Pagination
                  currentPage={pagination.current}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Companies;