import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { FaMars, FaVenus, FaGenderless, FaEye, FaEnvelope } from "react-icons/fa";

interface InPatient {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateofbirth: string;
  chronicillness: string;
  address: string;
  bloodgroup: string;
  admitdate: string;
  dischargedate: string;
  ward: string;
  status: string;
  medications: { [key: string]: string };
}

const InPatientList: React.FC = () => {
  const [inPatients, setInPatients] = useState<InPatient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5173/get/inpatients');
        setInPatients(response.data);
      } catch (error) {
        console.error('Error fetching inpatients:', error);
      }
    };

    fetchData();
  }, []);

  const renderGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return <FaMars className="text-blue-500" />;
      case 'female':
        return <FaVenus className="text-pink-500" />;
      default:
        return <FaGenderless className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Inpatients List</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chronic Illness</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admit Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inPatients.map((patient) => (
            <tr key={patient._id}>
              <td className="px-6 py-4 whitespace-nowrap  text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${patient.firstName}+${patient.lastName}&background=random`} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{`${patient.firstName} ${patient.lastName}`}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{renderGenderIcon(patient.gender)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.chronicillness}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.admitdate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.status === 'admitted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {patient.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/doctor/inpatientdetails?email=${patient.email}`}>
                <button
                    className="bg-green-100 text-green-500 hover:bg-green-200 rounded-full p-2 mr-2"
                  >
                    <FaEye size={18} />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InPatientList;
