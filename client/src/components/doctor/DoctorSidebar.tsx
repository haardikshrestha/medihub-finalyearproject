import { TbHome, TbCalendar, TbUser, TbList, TbSettings, TbLogout } from "react-icons/tb";
import { IoMdMedkit } from 'react-icons/io';
import { Link } from 'react-router-dom';

const DoctorSidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-52 bg-gray-100 text-base-content">
        <div className="mb-4 flex items-center">
          <img
            src="/src/assets/logo-l.png"
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
          <Link to="/patient/doctors" className="flex items-center hover:text-gray-600 text-sm">
            <TbCalendar className="mr-2" />
            Appointments
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/pathology" className="flex items-center hover:text-gray-600 text-sm">
            <TbUser className="mr-2" />
            Patients
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/pathology" className="flex items-center hover:text-gray-600 text-sm">
            <IoMdMedkit className="mr-2" />
            Surgeries
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/Appointments" className="flex items-center hover:text-gray-600 text-sm">
            <TbList className="mr-2" />
            Pathology
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/Settings" className="flex items-center hover:text-gray-600 text-sm">
            <TbSettings className="mr-2" />
            Settings
          </Link>
        </li>
        {/* logout button at the bottom */}
        <div className="absolute bottom-0 w-full left-0 p-4">
          <button
            className="btn border-none bg-error w-full text-center text-white"
            // onClick={handleLogout}
          >
            <TbLogout className="mr-2" />
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

export default DoctorSidebar;
