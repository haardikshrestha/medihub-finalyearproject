// Header.js
import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Assuming you have an appropriate search icon
import { FiUser } from 'react-icons/fi'; // Assuming you have an appropriate user icon

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Search Bar on the Left */}
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white py-2 pl-8 pr-3 rounded-full focus:outline-none focus:shadow-outline"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Profile Avatar on the Right */}
      <div className="flex items-center">
        <div className="mr-4">
          {/* Replace the following div with your profile avatar */}
          <div className="bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
            <FiUser className="text-white" />
          </div>
        </div>
        {/* Add your user name or other user-related information here */}
        <span className="text-sm">John Doe</span>
      </div>
    </header>
  );
};

export default Header;
