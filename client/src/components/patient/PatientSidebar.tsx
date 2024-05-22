import { TbHome, TbCalendar, TbBed , TbSettings, TbLogout } from "react-icons/tb";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdMedkit } from "react-icons/io";
import { IoIosMedical } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store";

const PatientSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handlelogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-52 bg-gray-100 text-base-content">
        <div className="mb-4 flex items-center">
          <img
            src="/src/assets/logo-images/logo-l.png"
            alt="Logo"
            className="w-3/4 h-auto object-cover mx-auto px-3 pb-3"
          />
        </div>
        <li className="mb-2">
          <Link to="/patient" className="flex items-center hover:text-gray-600 text-sm">
            <TbHome className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/patient/appointments"
            className="flex items-center hover:text-gray-600 text-sm"
          >
            <TbCalendar className="mr-2" />
            Appointments
          </Link>
        </li>
        
        <li className="mb-2">
          <Link
            to="/patient/doctors"
            className="flex items-center hover:text-gray-600 text-sm"
          >
            <IoIosMedical className="mr-2" />
            Doctors
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/patient/pathology"
            className="flex items-center hover:text-gray-600 text-sm"
          >
            <IoMdMedkit className="mr-2" />
            Pathology
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/patient/wards"
            className="flex items-center hover:text-gray-600 text-sm"
          >
            <TbBed  className="mr-2" />
            Admission
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/patient/Settings"
            className="flex items-center hover:text-gray-600 text-sm"
          >
            <TbSettings className="mr-2" />
            Settings
          </Link>
        </li>
        <div className="absolute bottom-0 w-full left-0 p-4">
          <button
            className="btn bg-white text-error border-error w-full text-center hover:bg-error hover:text-white hover:border-error"
            onClick={handlelogout}
          >
            <TbLogout className="mr-2" />
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

export default PatientSidebar;
