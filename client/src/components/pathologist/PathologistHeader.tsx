import { GiTestTubes } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PathologistHeader = () => {
  const [pathologistName, setPathologistName] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .get(`http://localhost:5173/getpathologistbyemail/${email}`)
        .then((response) => {
          const { fullname } = response.data;
          setPathologistName(`${fullname}`);
        })
        .catch((error) => {
          console.error("Error fetching pathologist details:", error);
        });
    } else {
      console.error("Email not found in localStorage");
    }
  }, []);

  return (
    <>
      <div className="justify-end bg-[#F2F2F2] flex items-center p-3 fixed top-0 w-full z-10">
        <div className="flex items-center">
          <Link to="/pathologist/test-results" className="text-black mx-2 text-xl relative"> 
            <GiTestTubes /> 
          </Link>
          <Link to="/pathologist/appointments" className="text-black mx-2 text-xl relative"> 
            <FaCalendarAlt /> 
          </Link>
          <div className="border-r border-gray-400 h-6 mx-2"></div>
          <a href="/pathologist/profile">
            <div className="flex items-center ml-2 mr-2 rounded-md hover:bg-gray-200 transition-all duration-300 p-2">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                <img
                  src="/src/assets/profile.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-black text-sm">{pathologistName}</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default PathologistHeader;
