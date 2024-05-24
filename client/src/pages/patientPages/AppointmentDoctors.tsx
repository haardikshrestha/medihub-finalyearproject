import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserMd } from 'react-icons/fa';

interface Doctor {
  _id?: string;
  fullname: string;
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
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
          setFilteredDoctors(response.data.data || []);
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

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredDoctors(
      doctors.filter((doctor) =>
        doctor.fullname.toLowerCase().includes(query.toLowerCase()) ||
        doctor.expertise.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleViewDoctorClick = (doctorEmail: string) => {
    navigate(`/patient/doctordetails?email=${doctorEmail}`);
  };

  return (
    <div className="container relative">
      <div className="flex items-center justify-between mb-4">
        <form onSubmit={handleSearch} className="relative flex-grow mr-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full py-3 pl-10 text-sm border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search Doctors"
            value={searchQuery}
            onChange={handleInputChange}
            required
          />
        </form>
      </div>

      {isLoading ? (
        // Loading state
        <p className="text-center text-gray-700">Loading doctors...</p>
      ) : error ? (
        // Error state
        <div className="flex flex-col items-center justify-center mt-[130px]">
          <FaUserMd className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-700 font-semibold">No doctors found with the selected expertise.</p>
        </div>
      ) : filteredDoctors.length > 0 ? (
        // Doctors list
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id || doctor.fullname}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-sm"
            >
              <div className="flex items-center justify-center h-32 bg-gray-100">
                <img
                  src="/src/assets/doc.png"
                  alt="Doctor Icon"
                  className="h-20 w-20 object-cover rounded-full"
                />
              </div>
              <div className="py-4 px-4 flex flex-col items-center">
                <h2 className="text-center text-gray-700 font-medium text-lg mb-2">
                  {doctor.fullname}
                </h2>
                <p className="text-center text-gray-500 text-sm mb-2">
                  {doctor.expertise}
                </p>
                <button
                  type="button"
                  className="bg-[#91BF77] hover:bg-[#7da466] text-white text-sm py-2 px-4 rounded-full w-2/3 transition-colors duration-300"
                  onClick={() => handleViewDoctorClick(doctor.email)}
                >
                  View 
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No doctors found
        <div className="text-center text-gray-500 py-8">
          <p>No doctors found.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
