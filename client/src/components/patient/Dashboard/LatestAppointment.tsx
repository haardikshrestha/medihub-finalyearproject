import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';



const LatestAppointment: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointment</h2>
        <FaCalendarAlt className="text-green-500 text-2xl" />
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        <p className="text-gray-600 mb-2">Date: </p>
        <p className="text-gray-600 mb-2">Doctor: </p>
      </div>
    </div>
  );
};

export default LatestAppointment;