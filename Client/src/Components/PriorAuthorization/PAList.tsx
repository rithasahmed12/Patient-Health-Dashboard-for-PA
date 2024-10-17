import { FileText, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Mock API function for fetching prior authorizations
const fetchPriorAuthorizations = async (): Promise<{ id: number, patientName: string, treatmentType: string, status: string, insurancePlan: string, dateOfService: string, diagnosisCode: string }[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    { id: 1, patientName: 'John Doe', treatmentType: 'Surgery', status: 'Approved', insurancePlan: 'Plan A', dateOfService: '2023-09-20', diagnosisCode: 'C34' },
    { id: 2, patientName: 'Jane Smith', treatmentType: 'Physical Therapy', status: 'Pending', insurancePlan: 'Plan B', dateOfService: '2023-09-22', diagnosisCode: 'M16' },
    { id: 3, patientName: 'Bob Johnson', treatmentType: 'MRI', status: 'Denied', insurancePlan: 'Plan C', dateOfService: '2023-09-23', diagnosisCode: 'S33' }
  ];
};

const PriorAuthorizationList: React.FC = () => {
  const [authorizations, setAuthorizations] = useState<{ id: number, patientName: string, treatmentType: string, status: string, insurancePlan: string, dateOfService: string, diagnosisCode: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    loadAuthorizations();
  }, []);

  const loadAuthorizations = async () => {
    setIsLoading(true);
    const result = await fetchPriorAuthorizations();
    setAuthorizations(result);
    setIsLoading(false);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Denied':
        return 'bg-red-100 text-red-800';
      case 'Pending':
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

  const filteredAuthorizations = authorizations
    .filter(auth => 
      auth.patientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter ? auth.status === statusFilter : true)
    );

  const paginatedAuthorizations = filteredAuthorizations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredAuthorizations.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Prior Authorization List</h2>

      {/* Search and Filter */}
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

      {/* Add Create Prior Authorization Button */}
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
          {/* Table view for larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 text-left">Patient Name</th>
                  <th className="px-4 py-2 text-left">Treatment Type</th>
                  <th className="px-4 py-2 text-left">Insurance Plan</th>
                  <th className="px-4 py-2 text-left">Date of Service</th>
                  <th className="px-4 py-2 text-left">Diagnosis Code</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAuthorizations.map((authorization) => (
                  <tr key={authorization.id} className="border-t">
                    <td className="px-4 py-4">{authorization.patientName}</td>
                    <td className="px-4 py-2">{authorization.treatmentType}</td>
                    <td className="px-4 py-2">{authorization.insurancePlan}</td>
                    <td className="px-4 py-2">{authorization.dateOfService}</td>
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

          {/* Card view for mobile devices */}
          <div className="md:hidden">
            {paginatedAuthorizations.map((authorization) => (
              <div key={authorization.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-4">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <User className="text-blue-500 mr-2" size={24} />
                    <h3 className="text-xl font-semibold text-gray-800">{authorization.patientName}</h3>
                  </div>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Treatment Type:</span> {authorization.treatmentType}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Plan:</span> {authorization.insurancePlan}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Date of Service:</span> {authorization.dateOfService}</p>
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

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PriorAuthorizationList;
