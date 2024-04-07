import React from "react";
import { FaUserCircle, FaEnvelope, FaCalendarPlus  } from "react-icons/fa";

interface DoctorCardProps {
  name: string;
  specialty: string;
  avatar: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, avatar }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
      <div className="relative">
        <img src={avatar} alt={`${name}'s avatar`} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 p-4">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-gray-300">{specialty}</p>
        </div>
      </div>
      <div className="p-4 flex justify-between mx-4">
        <button className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white  py-2 px-4 rounded-full flex items-center">
          <FaUserCircle className="mr-2" />
          <span className="hidden sm:inline">Profile</span>
        </button>
        <button className="text-amber-500 border border-amber-500  hover:bg-amber-500 hover:text-white  py-2 px-4 rounded-full flex items-center">
          <FaEnvelope className="mr-2" />
          <span className="hidden sm:inline">Email</span>
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <button className="bg-[#91BF77] hover:bg-[#7da466] text-white  py-2 px-4 rounded-full flex items-center">
          <FaCalendarPlus  className="mr-2" />
          <span className="hidden sm:inline">Book Now</span>
        </button>
      </div>
    </div>
  );
};

// Example usage
const doctorData = [
  {
    name: "Dr. Kathryn Murphy",
    specialty: "Urologist",
    avatar: "",
  },
];

const App = () => {
  return (
    <div className="flex justify-center gap-8 p-8">
      {doctorData.map((doctor, index) => (
        <DoctorCard
          key={index}
          name={doctor.name}
          specialty={doctor.specialty}
          avatar="\src\assets\docpfp.jpg"
        />
      ))}
    </div>
  );
};

export default App;
