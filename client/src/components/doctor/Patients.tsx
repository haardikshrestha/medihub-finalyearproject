import { useEffect, useState } from "react";
import { FaMars, FaVenus, FaGenderless, FaEye, FaEnvelope } from "react-icons/fa";

interface Patient {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  chronicillness: string;
  bloodgroup: string;
}

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:5173/getpatients");
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return <FaMars className="text-blue-500" />;
      case "female":
        return <FaVenus className="text-pink-500" />;
      default:
        return <FaGenderless className="text-gray-500" />;
    }
  };

  const navigateToPatientPage = (email: string) => {
    window.location.href = `/doctor/patients/view?email=${email}`;
  };

  const openEmailClient = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Patients Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Chronic Illness
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Blood Group
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient._id} className="hover:bg-gray-100 transition-colors duration-300">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{`${patient.firstName} ${patient.lastName}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getGenderIcon(patient.gender)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.chronicillness}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{patient.bloodgroup}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex justify-center">
                  <button
                    className="bg-green-100 text-green-500 hover:bg-green-200 rounded-full p-2 mr-2"
                    onClick={() => navigateToPatientPage(patient.email)}
                  >
                    <FaEye size={18} />
                  </button>
                  <button
                    className="bg-blue-100 text-blue-500 hover:bg-blue-200 rounded-full p-2"
                    onClick={() => openEmailClient(patient.email)}
                  >
                    <FaEnvelope size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;