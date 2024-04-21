import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FaUserMd, FaEnvelope, FaClock, FaCalendarAlt, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import AppointmentForm from '@/components/patient/Appointments/AppointmentForm';

interface Doctor {
  _id?: string;
  fullName: string;
  expertise: string;
  email: string;
  degree: string;
  school: string;
  startTime: string;
  endTime: string;
  daysAvailable: string[];
  fees: string;
}

const DoctorDetails: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        const patientEmail = localStorage.getItem("email");
        if (!email) {
          throw new Error('Email parameter is missing');
        }
        const response = await axios.get(`http://localhost:5173/getdoctorbyemail/${email}`);
        setDoctor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctorDetails();
  }, [location.search]);

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading ? (
        <p className="text-center">Loading doctor details...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : doctor ? (
        <div className="bg-white rounded-lg  overflow-hidden border border-gray-200 w-full p-4">
          <div className="flex items-center justify-center mb-6">
            <FaUserMd className="text-2xl text-blue-500 mr-4" />
            <h3 className="text-2xl font-semibold">{doctor.fullName}</h3>
          </div>
          <div className="flex flex-col md:flex-row justify-between mt-4">
            <div className="flex flex-col mb-4 md:w-1/2 md:pr-4">
              <div className="flex items-center mb-6">
                <FaEnvelope className="text-gray-500 mr-2" />
                <p className="text-gray-700">{doctor.email}</p>
              </div>
              <div className="flex items-center mb-6">
                <FaUniversity className="text-gray-500 mr-2" />
                <p className="text-gray-700">{doctor.degree} from {doctor.school}</p>
              </div>
            </div>
            <div className="flex flex-col mb-4 md:w-1/2 md:pl-4">
              <div className="flex items-center mb-6">
                <FaClock className="text-gray-500 mr-2" />
                <p className="text-gray-700">Available from {doctor.startTime} to {doctor.endTime}</p>
              </div>
              <div className="flex items-center mb-6">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <p className="text-gray-700">Available on {doctor.daysAvailable.join(', ')}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaMoneyBillWave className="text-gray-500 mr-2" />
                <p className="text-gray-700">Consultation fees: ${doctor.fees}</p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Book an Appointment</h2>
            <AppointmentForm doctorEmail={doctor.email} />
          </div>
          
        </div>
        
      ) : (
        <p className="text-center">Doctor details not found.</p>
      )}
      
    </div>
  );
};

export default DoctorDetails;
