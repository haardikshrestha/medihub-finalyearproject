import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

interface Doctor {
  _id?: string;
  fullName: string;
  expertise: string;
  email: string;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const expertise = searchParams.get('department') || '';

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5173/getdoctorsbyexpertise/${expertise}`);
        setDoctors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, [expertise]);

  const handleViewDoctorClick = (doctorEmail: string) => {
    navigate(`/patient/doctordetails?email=${doctorEmail}`);
  };

  return (
    <div className="container mx-auto">
      <p className='mb-4'>Doctors under {expertise}:</p>
      {isLoading ? (
        <p className="text-center text-gray-700">Loading doctors...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : doctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id || doctor.fullName}
              className="bg-white rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="h-40 bg-gray-300 flex items-center justify-center">
                {/* Add any image or icon here */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.fullName}</h3>
                <p className="text-gray-700 mb-4">{doctor.expertise}</p>
                <button
                  className="bg-[#91BF77] hover:bg-[#7da466] text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                  onClick={() => handleViewDoctorClick(doctor.email)}
                >
                  View Doctor
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No doctors found with the selected expertise.</p>
      )}
    </div>
  );
};

export default DoctorList;
