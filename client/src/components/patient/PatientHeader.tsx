import { useState, useEffect } from "react";
import axios from "axios";
import { TbBell} from "react-icons/tb";
import { Link } from "react-router-dom"; // Added Link import

const PatientHeader = () => {
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:5173/patients/${email}`)
        .then((response) => {
          const { firstName, lastName } = response.data;
          setPatientName(`${firstName} ${lastName}`);
        })
        .catch((error) => {
          console.error("Error fetching patient details:", error);
        });
    } else {
      console.error("Email not found in localStorage");
    }
  }, []);

  return (
    <>
      <div className="justify-end bg-gray-100 flex items-center p-3 fixed top-0 w-full z-10">
        <Link to="/patient/notifications" className="text-black mx-2 text-xl">
          <TbBell />
        </Link>
        <div className="border-r border-gray-400 h-6 mx-2"></div>
        <a href="/patient/profile">
          <div className="flex items-center ml-2 mr-2 rounded-md hover:bg-gray-200 transition-all duration-300 p-2">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              <img
                src="/src/assets/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-black text-sm">{patientName}</p>
          </div>
        </a>
      </div>
    </>
  );
};

export default PatientHeader;
