import React, { useState } from 'react';

const BedBookingComponent: React.FC = () => {
  const [selectedBed, setSelectedBed] = useState<string | null>(null);

  const handleBedSelection = (bed: string) => {
    setSelectedBed(bed);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Book a Bed
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div
            className={`rounded-full h-16 w-16 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
              selectedBed === 'bed1'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => handleBedSelection('bed1')}
          >
            1
          </div>
          <div
            className={`rounded-full h-16 w-16 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
              selectedBed === 'bed2'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => handleBedSelection('bed2')}
          >
            2
          </div>
          <div
            className={`rounded-full h-16 w-16 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
              selectedBed === 'bed3'
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => handleBedSelection('bed3')}
          >
            3
          </div>
          {/* Add more bed options as needed */}
        </div>
        <div className="mt-8">
          <button
            className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition-colors duration-300"
            disabled={!selectedBed}
          >
            Book Bed {selectedBed}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BedBookingComponent;