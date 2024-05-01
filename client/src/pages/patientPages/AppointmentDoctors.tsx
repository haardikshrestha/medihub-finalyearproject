import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserMd } from 'react-icons/fa';

interface Doctor {
  _id?: string;
  fullName: string;
  expertise: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Doctor[] | null;
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
        const response = await axios.get<ApiResponse>(`http://localhost:5173/getdoctorsbyexpertise/${expertise}`);
        if (response.data.success) {
          setDoctors(response.data.data || []);
        } else {
          setError(response.data.message);
        }
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
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Doctors under {expertise}</h2>

      {isLoading ? (
        // Loading state
        <p className="text-center text-gray-700">Loading doctors...</p>
      ) : error ? (
        // Error state
        <div className="flex flex-col items-center justify-center mt-[130px]">
          <FaUserMd className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-700 font-semibold">No doctors found with the selected expertise.</p>
        </div>
      ) : doctors.length > 0 ? (
        // Doctors list
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id || doctor.fullName} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Doctor card header */}
              <div className="h-40 bg-gray-300 flex items-center justify-center">
                {/* Add any image or icon here */}
                <FaUserMd className="text-4xl text-gray-500" />
              </div>
              {/* Doctor card body */}
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
        // No doctors found
        <div className="flex flex-col items-center justify-center">
          <FaUserMd className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-700 font-semibold">No doctors found with the selected expertise.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;