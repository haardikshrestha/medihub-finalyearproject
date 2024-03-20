import React, { useState } from 'react';
import { FaUserInjured, FaCalendarAlt, FaNotesMedical, FaClipboardList, FaBell } from 'react-icons/fa';

interface Patient {
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  conditions: string[];
  appointments: {
    date: string;
    time: string;
    reason: string;
  }[];
  medications: {
    name: string;
    dosage: string;
    instructions: string;
  }[];
  labResults: {
    test: string;
    result: string;
    date: string;
  }[];
}

const PatientDashboard: React.FC = () => {
  const [patient] = useState<Patient>({
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    bloodType: 'A+',
    conditions: ['Asthma', 'High Blood Pressure'],
    appointments: [
      { date: '2023-05-15', time: '10:00 AM', reason: 'Routine Check-up' },
      { date: '2023-06-01', time: '2:30 PM', reason: 'Follow-up' },
    ],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', instructions: 'Take once daily' },
      { name: 'Albuterol Inhaler', dosage: '2 puffs', instructions: 'As needed for asthma symptoms' },
    ],
    labResults: [
      { test: 'Complete Blood Count', result: 'Normal', date: '2023-04-01' },
      { test: 'Lipid Panel', result: 'High Cholesterol', date: '2023-04-01' },
    ],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaUserInjured className="text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">Patient Information</h2>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Name:</h3>
            <p>{patient.name}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Age:</h3>
            <p>{patient.age}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Gender:</h3>
            <p>{patient.gender}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Blood Type:</h3>
            <p>{patient.bloodType}</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">Appointments</h2>
          </div>
          {patient.appointments.length > 0 ? (
            <div>
              {patient.appointments.map((appointment, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{appointment.reason}</h3>
                  <p>
                    Date: {appointment.date} | Time: {appointment.time}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No upcoming appointments.</p>
          )}
        </div>

        {/* Medications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaNotesMedical className="text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">Medications</h2>
          </div>
          {patient.medications.length > 0 ? (
            <div>
              {patient.medications.map((medication, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{medication.name}</h3>
                  <p>Dosage: {medication.dosage}</p>
                  <p>Instructions: {medication.instructions}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No medications prescribed.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Conditions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">Conditions</h2>
          </div>
          {patient.conditions.length > 0 ? (
            <ul>
              {patient.conditions.map((condition, index) => (
                <li key={index} className="mb-2">
                  {condition}
                </li>
              ))}
            </ul>
          ) : (
            <p>No conditions listed.</p>
          )}
        </div>

        {/* Lab Results */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaNotesMedical className="text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">Lab Results</h2>
          </div>
          {patient.labResults.length > 0 ? (
            <div>
              {patient.labResults.map((result, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{result.test}</h3>
                  <p>Result: {result.result}</p>
                  <p>Date: {result.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No lab results available.</p>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="flex items-center mb-4">
          <FaBell className="text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>
        <p>No new notifications.</p>
      </div>
    </div>
  );
};

export default PatientDashboard;