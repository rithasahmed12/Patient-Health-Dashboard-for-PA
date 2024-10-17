import React, { useEffect, useState } from 'react';
import { User, ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { getPriorAuthorizationList, updateAuthorizationStatus } from '../api/api';
import Modal from 'react-modal';

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

Modal.setAppElement('#root');

const InsuranceDashboard: React.FC = () => {
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedAuthorization, setSelectedAuthorization] = useState<Authorization | null>(null);
  const [newStatus, setNewStatus] = useState<'approved' | 'denied' | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    loadAuthorizations();
  }, []);

  const loadAuthorizations = async () => {
    try {
      setIsLoading(true);
      const response = await getPriorAuthorizationList();
      
      if (response && response.status === 200) {
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

  const openModal = (authorization: Authorization, status: 'approved' | 'denied') => {
    setSelectedAuthorization(authorization);
    setNewStatus(status);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAuthorization(null);
    setNewStatus(null);
  };

  const confirmStatusUpdate = async () => {
    if (selectedAuthorization && newStatus) {
      try {
        await updateAuthorizationStatus(selectedAuthorization._id, newStatus);
        loadAuthorizations();
      } catch (error) {
        console.error("Error updating authorization status:", error);
      } finally {
        closeModal();
      }
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
    <>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Insurance Dashboard</h2>

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
                  <th className="px-4 py-2 text-left">Prescriber Name</th>
                  <th className="px-4 py-2 text-left">Prescriber Specialty</th>
                  <th className="px-4 py-2 text-left">Treatment Type</th>
                  <th className="px-4 py-2 text-left">Insurance Name</th>
                  <th className="px-4 py-2 text-left">Date of Service</th>
                  <th className="px-4 py-2 text-left">Diagnosis Code</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAuthorizations.map((authorization) => (
                  <tr key={authorization._id} className="border-t">
                    <td className="px-4 py-4">{authorization.patient.value}</td>
                    <td className="px-4 py-4">{authorization.patient.label}</td>
                    <td className="px-4 py-2">{authorization.prescriberName}</td>
                    <td className="px-4 py-2">{authorization.prescriberSpecialty}</td>
                    <td className="px-4 py-2">{authorization.treatmentType}</td>
                    <td className="px-4 py-2">{authorization.insuranceName}</td>
                    <td className="px-4 py-2">{new Date(authorization.dateOfService).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{authorization.diagnosisCode}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(authorization.status)}`}>
                        {authorization.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {authorization.status === 'pending' && (
                        <>
                          <button
                            onClick={() => openModal(authorization, 'approved')}
                            className="text-green-500 hover:text-green-700 mr-2"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button
                            onClick={() => openModal(authorization, 'denied')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      )}
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
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Prescriber Name:</span> {authorization.prescriberName}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Prescriber Specialty:</span> {authorization.prescriberSpecialty}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Treatment Type:</span> {authorization.treatmentType}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Insurance Name:</span> {authorization.insuranceName}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Date of Service:</span> {new Date(authorization.dateOfService).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Diagnosis Code:</span> {authorization.diagnosisCode}</p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(authorization.status)} ml-2`}>
                      {authorization.status}
                    </span>
                  </p>
                  {authorization.status === 'pending' && (
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => openModal(authorization, 'approved')}
                        className="text-green-500 hover:text-green-700"
                      >
                        <CheckCircle size={24} />
                      </button>
                      <button
                        onClick={() => openModal(authorization, 'denied')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XCircle size={24} />
                      </button>
                    </div>
                  )}
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

<Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Confirm Status Update"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Confirm Status Update</h3>
          <p className="text-gray-700 mb-4">
            Are you sure you want to mark the authorization for{' '}
            <span className="font-semibold">{selectedAuthorization?.patient.label}</span> as{' '}
            <span className={`font-semibold ${newStatus === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
              {newStatus === 'approved' ? 'Approved' : 'Denied'}
            </span>
            ?
          </p>
          <div className="flex justify-end">
            <button
              onClick={confirmStatusUpdate}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 mr-2"
            >
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
    </>
  );
};

export default InsuranceDashboard;
