import React, { useState, useEffect } from 'react';
import { MdLightbulb, MdWbSunny, MdNightlight } from 'react-icons/md'; // Import icons
import axios from 'axios';

interface Medication {
  name: string;
  dosage: string;
  time: string;
}

const Medications: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const email = localStorage.getItem('email');
        if (email) {
          const response = await axios.get(`http://localhost:5173/get/patientdiagnosis/${email}`);
          const patientDiagnosis = response.data;
          const medicationsData = patientDiagnosis.map((diagnosis: any) => ({
            name: diagnosis.medication.medicine,
            dosage: diagnosis.medication.dosage,
            time: diagnosis.medication.time
          }));
          setMedications(medicationsData);
          console.log(medicationsData);
        } else {
          console.error('Email not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const getTimeIcon = (time: string) => {
    if (time) {
      switch (time.toLowerCase()) {
        case 'morning':
          return <MdLightbulb className="w-5 h-5 text-yellow-500 mr-1" />;
        case 'afternoon':
          return <MdWbSunny className="w-5 h-5 text-orange-500 mr-1" />;
        case 'evening':
          return <MdNightlight className="w-5 h-5 text-blue-500 mr-1" />;
        default:
          return null;
      }
    }
    return null;
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white overflow-hidden">
      <h2 className="text-xl font-medium text-gray-700 p-4 border-b border-gray-200">Your Medications</h2>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto min-w-max ">
          <thead>
            <tr className="text-left bg-gray-100 border-b border-gray-200 font-medium">
              <th className="p-4">Medication</th>
              <th className="p-4">Dosage</th>
              <th className="p-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">{medication.name}</td>
                <td className="p-4">{medication.dosage}</td>
                <td className="p-4 flex items-center">{getTimeIcon(medication.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medications;
