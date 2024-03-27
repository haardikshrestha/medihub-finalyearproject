import React from 'react';
import { FaCalendarAlt, FaPills, FaNotesMedical, FaUserMd } from 'react-icons/fa';

interface PatientDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  patient: {
    name: string;
    avatar: string;
    upcomingAppointments: {
      date: string;
      doctor: string;
      reason: string;
    }[];
    prescriptions: {
      name: string;
      dosage: string;
      instructions: string;
    }[];
    medicalRecords: {
      date: string;
      description: string;
      doctor: string;
    }[];
    primaryCarePhysician: {
      name: string;
      specialty: string;
      phone: string;
      email: string;
    };
  };
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, ...rest }) => {
  return (
    <div className="bg-gray-100 min-h-screen py-12" {...rest}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-6 px-8">
          <div className="flex items-center">
            <img
              className="h-24 w-24 rounded-full object-cover mr-6"
              src={patient.avatar}
              alt={`${patient.name}'s avatar`}
            />
            <h2 className="text-2xl font-bold text-white">Welcome, {patient.name}</h2>
          </div>
        </div>
        <div className="py-6 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-blue-500 mr-2" size={24} />
                <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {patient.upcomingAppointments.map((appointment, index) => (
                  <li key={index} className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-700 font-semibold">{appointment.date}</p>
                        <p className="text-gray-600">Doctor: {appointment.doctor}</p>
                        <p className="text-gray-600">Reason: {appointment.reason}</p>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Reschedule
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaPills className="text-green-500 mr-2" size={24} />
                <h3 className="text-lg font-semibold">Current Prescriptions</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {patient.prescriptions.map((prescription, index) => (
                  <li key={index} className="py-4">
                    <p className="text-gray-700 font-semibold">{prescription.name}</p>
                    <p className="text-gray-600">Dosage: {prescription.dosage}</p>
                    <p className="text-gray-600">Instructions: {prescription.instructions}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaNotesMedical className="text-red-500 mr-2" size={24} />
                <h3 className="text-lg font-semibold">Medical Records</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {patient.medicalRecords.map((record, index) => (
                  <li key={index} className="py-4">
                    <p className="text-gray-700 font-semibold">{record.date}</p>
                    <p className="text-gray-600">{record.description}</p>
                    <p className="text-gray-600">Doctor: {record.doctor}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaUserMd className="text-purple-500 mr-2" size={24} />
                <h3 className="text-lg font-semibold">Primary Care Physician</h3>
              </div>
              <p className="text-gray-700 font-semibold">{patient.primaryCarePhysician.name}</p>
              <p className="text-gray-600">Specialty: {patient.primaryCarePhysician.specialty}</p>
              <p className="text-gray-600">Phone: {patient.primaryCarePhysician.phone}</p>
              <p className="text-gray-600">Email: {patient.primaryCarePhysician.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;