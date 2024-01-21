// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-56 bg-base-100 text-base-content">
        <div className="mb-4 flex items-center">
          <img
            src="/src/assets/logo-l.png"
            alt="Logo"
            className="w-3/4 h-auto object-cover mx-auto px-3 pb-3"
          />
        </div>
        <li className="mb-2">
          <Link to="/patient" className="flex items-center hover:text-gray-600 text-sm">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/doctors" className="flex items-center hover:text-gray-600 text-sm">
            Doctors
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/pathology" className="flex items-center hover:text-gray-600 text-sm">
            Pathology
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/Appointments" className="flex items-center hover:text-gray-600 text-sm">
            Appointments
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/packages" className="flex items-center hover:text-gray-600 text-sm">
            Health Packages
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/Settings" className="flex items-center hover:text-gray-600 text-sm">
            Settings
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/patient/profile" className="flex items-center hover:text-gray-600 text-sm">
            Profile
          </Link>
        </li>
        {/* logout button at the bottom */}
        <div className="absolute bottom-0 w-full left-0 p-4">
          <button
            className="btn border-none bg-error w-full text-center text-white"
            // onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
