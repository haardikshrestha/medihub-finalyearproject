import React, { useState } from 'react';
import { HiX, HiCheckCircle } from 'react-icons/hi';

const DeleteConfirmationModal: React.FC<{ onClose: () => void; onDelete: () => void }> = ({ onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6">
        <div>
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Doctor
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <HiX className="w-4 h-4" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-4 md:p-5">
            <p className="text-gray-700 dark:text-white mb-4">
              Are you sure you want to delete this doctor?
            </p>
            <div className="flex items-center justify-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-4 focus:outline-none focus:shadow-outline transition duration-300"
                onClick={() => {
                  onDelete();
                  onClose();
                }}
              >
                <HiCheckCircle className="inline-block w-5 h-5 mr-1" />
                Confirm
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;