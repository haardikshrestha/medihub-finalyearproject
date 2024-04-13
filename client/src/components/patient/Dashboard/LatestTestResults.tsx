import React from 'react';
import { FaFilePdf } from 'react-icons/fa';


const LatestTestResults: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Latest Test Results</h2>
        <FaFilePdf className="text-red-500 text-2xl" />
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
        >
          <FaFilePdf className="mr-2 text-red-500" />
          View PDF
        </a>
      </div>
      <div className="mt-4 text-gray-600">
        <p>Last updated: </p>
      </div>
    </div>
  );
};

export default LatestTestResults;