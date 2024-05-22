import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import axios from "axios";

interface Department {
  name: string;
}

const PatientAppointments = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get<string[]>(
        "http://localhost:5173/getdepartmentnames",
      );
      if (response.status === 200) {
        setDepartments(response.data);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No need to filter departments immediately on form submit
    // The list should be filtered as the user types
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    // Filter departments based on the search query
    const filteredDepartments = departments.filter((department) =>
      department.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setDepartments(filteredDepartments);
    // If search query is empty, fetch all departments again
    if (event.target.value === "") {
      fetchDepartments();
    }
  };

  const navigator = (departmentName: string) => {
    navigate(`/patient/adoctors?department=${departmentName}`);
  };

  const handleViewAppointmentHistory = () => {
    navigate("/patient/appointmenthistory");
  };

  return (
    <div className="container relative">
      <form onSubmit={handleSearch} className="relative mb-4 mt-0 flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full py-3 pl-10 text-sm border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search Departments"
          value={searchQuery}
          onChange={handleInputChange}
          required
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {departments.map((department, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-sm"
          >
            <div className="flex items-center justify-center h-32 bg-gray-100">
              <img
                src={`/src/assets/department-images/${department}.png`}
                alt={`${department} Icon`}
                className="h-20 w-20 object-cover"
              />
            </div>
            <div className="py-4 px-4 flex flex-col items-center">
              <h2 className="text-center text-gray-700 font-medium text-lg mb-2">
                {department}
              </h2>
              <button
                type="button"
                className="bg-[#91BF77] hover:bg-[#7da466] text-white text-sm py-2 px-4 rounded-full w-2/3 transition-colors duration-300"
                onClick={() => navigator(department)}
              >
                Check
              </button>
            </div>
          </div>
        ))}
      </div>

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

export default PatientAppointments;
