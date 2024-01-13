import React, { useState } from 'react';

const CreateWard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <form className="bg-white rounded-lg px-10 pt-6 pb-8 mb-4 mt-4">
      <div className="flex items-center justify-center">
        {/* Container for Phone Number and Dropdown */}
        <div className="flex">
          {/* Phone Number */}
          <div className="mb-6">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="wardnumber"
              type="text"
              placeholder="Ward Number"
            />
          </div>

          {/* Dropdown */}
          <div className="relative inline-block text-left ml-4">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              onClick={toggleDropdown}
              id="options-menu"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Department
            </button>

            {isDropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Option 1
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Option 2
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Option 3
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Ward Button */}
      <div className="flex items-center justify-center">
        <button
          className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          type="button"
        >
          Add Ward
        </button>
      </div>
    </form>
  );
};

export default CreateWard;
