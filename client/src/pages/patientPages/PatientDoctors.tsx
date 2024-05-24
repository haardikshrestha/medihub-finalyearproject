import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaClipboardCheck, FaFilter } from "react-icons/fa";
import axios from "axios";

interface Doctor {
  _id: string;
  fullname: string;
  email: string;
  expertise: string;
  degree: string;
  school: string;
  startTime: string;
  endTime: string;
  daysAvailable: string[];
  fees: string;
}

interface Department {
  depName: string;
}

const PatientDoctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedDepartment]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get<Doctor[]>("http://localhost:5173/api/doctors");
      if (response.status === 200) {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } else {
        console.error("Failed to fetch doctors");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get<Department[]>("http://localhost:5173/getdepartments");
      if (response.status === 200) {
        const departmentNames = response.data.map((department) => department.depName);
        setDepartments(departmentNames);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDepartmentFilter = (department: string) => {
    setSelectedDepartment(department);
    setIsDropdownOpen(false);
  };

  const applyFilters = () => {
    let filtered = doctors;

    if (searchQuery) {
      filtered = filtered.filter((doctor) =>
        doctor.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter((doctor) =>
        doctor.expertise.includes(selectedDepartment)
      );
    }

    setFilteredDoctors(filtered);
  };

  const navigator = (email: string) => {
    navigate(`/patient/doctordetails?email=${encodeURIComponent(email)}`);
  };

  const handleViewAppointmentHistory = () => {
    navigate("/patient/appointmenthistory");
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
        <div className="relative">
          <button
            type="button"
            className="flex items-center justify-center bg-[#91BF77] hover:bg-[#7da466] text-white text-sm py-2 px-4 rounded-full transition-colors duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaFilter className="mr-2" />
            Filter
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-3 bg-white rounded-md border">
              <ul className="py-2">
                <li
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDepartmentFilter("")}
                >
                  All
                </li>
                {departments.map((department) => (
                  <li
                    key={department}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDepartmentFilter(department)}
                  >
                    {department}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {filteredDoctors.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No doctors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
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
                  onClick={() => navigator(doctor.email)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Appointment History Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleViewAppointmentHistory}
          className="bg-gradient-to-br from-[#91BF77] to-[#7da466] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center"
        >
          <FaClipboardCheck className="mr-2" size={20} />
          View Appointment History
        </button>
      </div>
    </div>
  );
};

export default PatientDoctors;
