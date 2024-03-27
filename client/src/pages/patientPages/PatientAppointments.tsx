import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter } from "react-icons/fa";
import ViewDoctorsCard from "@/components/patient/Appointments/ViewDoctorsCard";

const departments = [
  { name: "Cardiology", icon: "/src/assets/department-images/cardiology.png" },
  { name: "Orthopedics", icon: "/src/assets/department-images/orthopedics.png" },
  { name: "Neurology", icon: "/src/assets/department-images/nerve.png" },
  { name: "Dermatology", icon: "/src/assets/department-images/skin.png" },
  { name: "Ophthalmology", icon: "/src/assets/department-images/eye.png" },
  { name: "Gynecology", icon: "/src/assets/department-images/fertility.png" },
  { name: "ENT", icon: "/src/assets/department-images/ent.png" },
  { name: "Urology", icon: "/src/assets/department-images/kidneys.png" },
  { name: "Pediatrics", icon: "/src/assets/department-images/baby.png" },
  { name: "Psychiatry", icon: "/src/assets/department-images/brain.png" },
];

const PatientAppointments = () => {
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform search functionality
  };

  const navigator = (departmentName: string) => {
    navigate(`/patient/adoctors?department=${departmentName}`);
  };

  return (
    <div className="container ">
      <ViewDoctorsCard/>
      <form onSubmit={handleSearch} className="relative mb-4 mt-0 flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full py-3 pl-10 text-sm border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search Doctors"
          required
        />
        <button
          type="submit"
          className="ml-4 bg-[#91BF77] hover:bg-[#7da466] focus:ring-4 focus:outline-none  font-medium rounded-full text-sm px-4 py-2 text-white transition-colors duration-300"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {departments.map((department, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md"
          >
            <div className="flex items-center justify-center h-32 bg-gray-100">
              <img
                src={department.icon}
                alt={`${department.name} Icon`}
                className="h-20 w-20 text-white"
              />
            </div>
            <div className="py-4 px-4 flex flex-col items-center">
              <h2 className="text-center text-gray-700 font-medium text-lg mb-2">
                {department.name}
              </h2>
              <button
                type="button"
                className="bg-[#91BF77] hover:bg-[#7da466] text-white text-sm py-2 px-4 rounded-full w-2/3 transition-colors duration-300"
                onClick={() => navigator(department.name)}
              >
                Check
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
