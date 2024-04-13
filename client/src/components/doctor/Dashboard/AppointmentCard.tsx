import "./AppointmentCard.css";
import {
  FaArrowRight,
  FaClock,
  FaNotesMedical,
  FaUserAlt,
  FaVenusMars,
} from "react-icons/fa";

const AppointmentCard = () => {
  return (
    <div className="border rounded-xl" style={{ height: "330px" }}>
      <p className="flex justify-center font-bold ml-2 mt-5 mb-2">
        Today's appointments:
      </p>
      <div
        className="appointment-container px-4 py-2"
        style={{ overflowY: "auto", height: "84.2%" }}
      >
        <div className="mt-4 appointment-card flex items-center p-4 bg-white rounded-xl mb-4 border ">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <img
              src="src\assets\pfp.png"
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div className="ml-4 flex flex-col">
            <h3 className="text-md font-semibold text-gray-800">Hardik Shrestha</h3>
            <div className="flex mt-3 gap-4">
              <div className="flex items-center mr-6">
                <FaClock className="text-gray-500 mr-3" />
                <p className="text-gray-600 text-sm">11:00 AM</p>
              </div>
              <div className="flex items-center mr-6">
                <FaUserAlt className="text-gray-500 mr-3" />
                <p className="text-gray-600 text-sm">Age: 32</p>
              </div>
              <div className="flex items-center mt-1">
                <FaNotesMedical className="text-gray-500 mr-3" />
                <p className="text-gray-600 text-sm">Fever</p>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <button className="bg-gray-200 flex items-center justify-center text-white rounded-full w-12 h-12 hover:bg-gray-300">
              <FaArrowRight className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
