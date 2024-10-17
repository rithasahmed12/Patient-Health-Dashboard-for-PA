import React, { useEffect, useState } from 'react';
import { Calendar, Pill, Activity, FileText, User} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../../api/api';


interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  dob: string;
  gender: string;
  insurance: string;
  status: string;
  treatments: Array<{ date: string; type: string; details: string }>;
  medications: Array<{ name: string; dosage: string; frequency: string }>;
  labResults: Array<{ date: string; test: string; result: string }>;
}
const PatientView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('treatments');
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadPatientData = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const response = await getPatient(id);
          console.log(response)
          if(response && response.status === 200){
            setPatientData(response.data);
          }
        } catch (error) {
          console.error('Error loading patient data:', error);
          // Handle error (e.g., show error message to user)
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadPatientData();
  }, [id]);


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
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!patientData) {
    return <div className="container mx-auto px-4 py-8">Patient not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <User className="text-blue-500 mr-2" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">{patientData.name}</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <p className="text-gray-600"><span className="font-semibold">Age:</span> {patientData.age}</p>
            <p className="text-gray-600"><span className="font-semibold">Date of Birth:</span> {patientData.dob}</p>
            <p className="text-gray-600"><span className="font-semibold">Gender:</span> {patientData.gender}</p>
            <p className="text-gray-600"><span className="font-semibold">Insurance:</span> {patientData.insurance}</p>
            <p className="text-gray-600"><span className="font-semibold">Condition:</span> {patientData.condition}</p>
            <div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(patientData.status)}`}>
                {patientData.status}
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap border-b border-gray-200 mb-4">
            <button
              className={`mr-4 py-2 flex items-center ${activeTab === 'treatments' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('treatments')}
            >
              <Calendar className="mr-1" size={16} /> Treatments
            </button>
            <button
              className={`mr-4 py-2 flex items-center ${activeTab === 'medications' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('medications')}
            >
              <Pill className="mr-1" size={16} /> Medications
            </button>
            <button
              className={`mr-4 py-2 flex items-center ${activeTab === 'labResults' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
              onClick={() => setActiveTab('labResults')}
            >
              <Activity className="mr-1" size={16} /> Lab Results
            </button>
          </div>
          {activeTab === 'treatments' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Treatment History</h2>
              <div className="space-y-4">
                {patientData.treatments.map((treatment, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300">
                    <p className="font-semibold text-blue-600">{treatment.date} - {treatment.type}</p>
                    <p className="text-gray-600 mt-2">{treatment.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'medications' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Medications</h2>
              <div className="space-y-4">
                {patientData.medications.map((medication, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300">
                    <p className="font-semibold text-blue-600">{medication.name}</p>
                    <p className="text-gray-600">Dosage: {medication.dosage}</p>
                    <p className="text-gray-600">Frequency: {medication.frequency}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'labResults' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Lab Results</h2>
              <div className="space-y-4">
                {patientData.labResults.map((result, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300">
                    <p className="font-semibold text-blue-600">{result.date} - {result.test}</p>
                    <p className="text-gray-600 mt-2">{result.result}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center w-full sm:w-auto">
          <FileText className="mr-2" size={20} /> Submit Prior Authorization
        </button>
      </div>
    </div>
  );
};

export default PatientView;