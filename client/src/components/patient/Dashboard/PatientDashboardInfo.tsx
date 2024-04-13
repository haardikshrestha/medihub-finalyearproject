import React from 'react';
import { Link } from 'react-router-dom'; // Import for navigation

const PatientDashboardInfo: React.FC = () => {
  const medications = ['Metformin', 'Atorvastatin', 'Lisinopril'];
  const vitalSigns = {
    heartRate: 80,
    bloodPressure: '120/80 mmHg',
    temperature: 37.2,
  };
  const appointments = [
    {
      date: '2024-04-20',
      doctor: 'Dr. Smith',
      reason: 'Follow-up Appointment',
    },
    {
      date: '2024-05-02',
      doctor: 'Dr. Jones',
      reason: 'Dermatology Consultation',
    },
  ];

  return (
    <div className="flex flex-col space-y-6 bg-gray-100 rounded-lg shadow-md p-6">
      {/* Medication Section */}
      <div className="flex justify-between items-center cursor-pointer hover:bg-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-medium text-gray-800">Medications</h2>
        <Link to="/medications" className="text-blue-500 hover:underline">
          View All
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboardInfo;
