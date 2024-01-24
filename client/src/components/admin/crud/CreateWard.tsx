import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';

const CreateWard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wardNumber, setWardNumber] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddWard = () => {
    // Implement your logic for adding ward with wardNumber and departmentName
    console.log('Adding ward:', wardNumber, 'in department:', departmentName);
  };

  return (
    <>
      {/* Modal toggle */}
      <button
        onClick={toggleModal}
        className="block text-white bg-lime-500 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        type="button"
      >
        Add Ward
      </button>

      {/* Main modal */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
            <div>
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Ward
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <HiX className="w-4 h-4" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5">
                <div className="mb-6 flex">
                  {/* Department Name */}
                  <div className="w-1/2 mr-4">
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="departmentname"
                      type="text"
                      placeholder="Department"
                      value={departmentName}
                      onChange={(e) => setDepartmentName(e.target.value)}
                    />
                  </div>
                  {/* Ward Number */}
                  <div className="w-1/2 ">
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="wardnumber"
                      type="text"
                      placeholder="Ward Number"
                      value={wardNumber}
                      onChange={(e) => setWardNumber(e.target.value)}
                    />
                  </div>

                  
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="bg-lime-500 hover:bg-lime-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    type="button"
                    onClick={handleAddWard}
                  >
                    Add Ward
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateWard;
