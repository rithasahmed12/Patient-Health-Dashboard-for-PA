import React, { useEffect, useState } from 'react';
import { FileText, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPriorAuthorizationList } from '../../api/api';

interface Authorization {
  _id: string;
  insuranceName: string;
  insuranceDetails: string;
  prescriberName: string;
  prescriberSpecialty: string;
  prescriberPhone: string;
  prescriberEmail: string;
  treatmentDetails: string;
  treatmentType: string;
  diagnosisCode: string;
  patient: {
    value: string;
    label: string;
  };
  dateOfService: string;
  status: string;
  timestamp: string;
}

const PriorAuthorizationList: React.FC = () => {
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadAuthorizations();
  }, []);

  const loadAuthorizations = async () => {
    try {
      setIsLoading(true);
      const response = await getPriorAuthorizationList();
      
      if(response && response.status === 200){
        setAuthorizations(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      }
      
    } catch (error) {
      console.error("Error loading authorizations:", error);
      setAuthorizations([]);
    } finally {
      setIsLoading(false);
    }
  };


  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'denied':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const filteredAuthorizations = authorizations.filter(auth => 
    auth.patient.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter ? auth.status.toLowerCase() === statusFilter.toLowerCase() : true)
  );

  const paginatedAuthorizations = filteredAuthorizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Prior Authorization List</h2>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchQuery}
          onChange={handleSearch}
          className="border px-3 py-2 rounded-md focus:outline-none w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md focus:outline-none ml-4 w-full md:w-1/3"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Denied">Denied</option>
        </select>
      </div>

      <div className="mb-4 text-right">
        <Link to="/prior-auth-form">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex transition duration-200">
            <FileText className="mr-2" size={20} />
            Get Prior Authorization
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 text-left">Patient ID</th>
                  <th className="px-4 py-2 text-left">Patient Name</th>
                  <th className="px-4 py-2 text-left">Treatment Type</th>
                  <th className="px-4 py-2 text-left">Insurance Name</th>
                  <th className="px-4 py-2 text-left">Date of Service</th>
                  <th className="px-4 py-2 text-left">Diagnosis Code</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAuthorizations.map((authorization) => (
                  <tr key={authorization._id} className="border-t">
                    <td className="px-4 py-4">{authorization.patient.value}</td>
                    <td className="px-4 py-4">{authorization.patient.label}</td>
                    <td className="px-4 py-2">{authorization.treatmentType}</td>
                    <td className="px-4 py-2">{authorization.insuranceName}</td>
                    <td className="px-4 py-2">{new Date(authorization.dateOfService).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{authorization.diagnosisCode}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(authorization.status)}`}>
                        {authorization.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {paginatedAuthorizations.map((authorization) => (
              <div key={authorization._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-4">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <User className="text-blue-500 mr-2" size={24} />
                    <h3 className="text-xl font-semibold text-gray-800">{authorization.patient.label}</h3>
                  </div>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Patient ID:</span> {authorization.patient.value}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Treatment Type:</span> {authorization.treatmentType}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Name:</span> {authorization.insuranceName}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Date of Service:</span> {new Date(authorization.dateOfService).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Diagnosis Code:</span> {authorization.diagnosisCode}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(authorization.status)}`}>
                      {authorization.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

           <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default PriorAuthorizationList;