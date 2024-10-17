import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, User, Sliders, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Range, getTrackBackground } from 'react-range';
import { useNavigate } from 'react-router-dom';

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  status: string;
  lastVisit: string;
}

interface PatientsResponse {
  patients: Patient[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const fetchPatients = async (
  page: number,
  limit: number,
  searchTerm: string,
  minAge: number,
  maxAge: number
): Promise<PatientsResponse> => {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/patients/get?page=${page}&limit=${limit}&searchTerm=${searchTerm}&minAge=${minAge}&maxAge=${maxAge}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    return { patients: [], totalCount: 0, totalPages: 0, currentPage: 1 };
  }
};

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState<[number, number]>([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [_totalPatients, setTotalPatients] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const pageSize = 6; 

  useEffect(() => {
    loadPatients();
  }, [searchTerm, ageRange, currentPage]);

  const loadPatients = async () => {
    setIsLoading(true);
    const result = await fetchPatients(currentPage, pageSize, searchTerm, ageRange[0], ageRange[1]);
    setPatients(result.patients);
    setTotalPatients(result.totalCount);
    setTotalPages(result.totalPages);
    setCurrentPage(result.currentPage);
    setIsLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAgeRangeChange = (values: number[]) => {
    setAgeRange(values as [number, number]);
    setCurrentPage(1);
  };

  const handleViewDetails = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Stable':
        return 'bg-green-100 text-green-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'Follow-up Required':
        return 'bg-yellow-100 text-yellow-800';
      case 'Improving':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Patient List</h1>
      <div className="mb-6 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients by name or condition..."
            className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>
        <div className="flex items-center space-x-4">
          <Sliders className="text-gray-400" size={20} />
          <div className="flex-1">
            <Range
              step={1}
              min={0}
              max={100}
              values={ageRange}
              onChange={handleAgeRangeChange}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '6px',
                    width: '100%',
                    background: getTrackBackground({
                      values: ageRange,
                      colors: ['#ddd', '#548BF4', '#ddd'],
                      min: 0,
                      max: 100
                    })
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '20px',
                    width: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 2px 6px #AAA',
                    transition: 'left 0.1s ease'
                  }}
                >
                  <div
                    style={{
                      height: '16px',
                      width: '5px',
                      backgroundColor: isDragged ? '#548BF4' : '#CCC',
                      transition: 'background-color 0.1s ease'
                    }}
                  />
                </div>
              )}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Min Age: {ageRange[0]}</span>
              <span>Max Age: {ageRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div key={patient._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <User className="text-blue-500 mr-2" size={24} />
                    <h2 className="text-xl font-semibold text-gray-800">{patient.name}</h2>
                  </div>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Age:</span> {patient.age}</p>
                  <p className="text-gray-600 mb-2"><span className="font-semibold">Condition:</span> {patient.condition}</p>
                  <p className="text-gray-600 mb-4"><span className="font-semibold">Last Visit:</span> {patient.lastVisit}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                    <button
                    onClick={()=>handleViewDetails(patient._id)}
                    className="text-blue-500 hover:text-blue-700 flex items-center">
                      View Details <ChevronRight size={20} className="ml-1" />
                    </button>
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
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
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
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientList;