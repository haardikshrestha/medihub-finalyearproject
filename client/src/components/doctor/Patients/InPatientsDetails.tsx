import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const InPatientDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const [inPatient, setInPatient] = useState<InPatient | null>(null);

  useEffect(() => {
    const fetchInPatient = async () => {
      try {
        if (!email) return; // Return early if email is null or undefined
        const response = await axios.get(`http://localhost:5173/get/one/inpatients/${email}`);
        setInPatient(response.data);
      } catch (error) {
        console.error('Error fetching inpatient details:', error);
      }
    };
    fetchInPatient();
  }, [email]);

  const handleDischargePatient = () => {
    if (inPatient && inPatient.email) {
      navigate(`/doctor/dischargepatient?email=${inPatient.email}`);
    }
  };

  if (!inPatient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inpatient Details</h1>
        {inPatient.status === 'admitted' ? (
          <button
            className="bg-[#FF7F00] hover:bg-[#FFA500] text-white font-bold py-2 px-4 rounded-lg"
            onClick={handleDischargePatient}
          >
            Discharge Patient
          </button>
        ) : (
          <p className="text-gray-500">Patient Discharged</p>
        )}
      </div>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-100">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {Object.entries(inPatient).map(([key, value]) => (
              <div key={key} className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 capitalize">{key}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default InPatientDetails;
