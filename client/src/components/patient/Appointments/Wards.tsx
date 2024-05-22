import React, { useState } from 'react';

interface Ward {
  id: string;
  name: string;
  beds: number;
  available: number;
}

const wards: Ward[] = [
  { id: 'ward1', name: 'General Ward', beds: 20, available: 8 },
  { id: 'ward2', name: 'Intensive Care Unit', beds: 10, available: 2 },
  { id: 'ward3', name: 'Maternity Ward', beds: 15, available: 5 },
  { id: 'ward4', name: 'Pediatric Ward', beds: 12, available: 4 },
];

const WardBookingComponent: React.FC = () => {
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  const handleWardSelection = (ward: Ward) => {
    setSelectedWard(ward);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Book a Bed
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wards.map((ward) => (
            <div
              key={ward.id}
              className={`rounded-lg shadow-md cursor-pointer transition-transform duration-300 ${
                selectedWard?.id === ward.id
                  ? 'transform scale-105 bg-green-500 text-white'
                  : 'bg-white text-gray-800 hover:shadow-lg'
              }`}
              onClick={() => handleWardSelection(ward)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{ward.name}</h3>
                <p className="text-gray-600">Total Beds: {ward.beds}</p>
                <p className="text-gray-600">Available Beds: {ward.available}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className={`py-3 px-6 rounded-lg shadow-md transition-colors duration-300 ${
              selectedWard
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-400 text-gray-800 cursor-not-allowed'
            }`}
            disabled={!selectedWard}
          >
            Book Bed in {selectedWard?.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WardBookingComponent;