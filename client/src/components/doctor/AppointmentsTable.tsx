import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

interface Appointment {
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptStatus: string;
  apptDisease: string;
  paymentStatus: string;
  transactionID: string;
}

const AppointmentsTable: React.FC = () => {
  // State to store appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Function to fetch appointments from the server
  const getAppointments = async () => {
    try {
      const response = await axios.get<Appointment[]>("http://localhost:5173/getappointments"); // Assuming the server is running on the same domain
      setAppointments(response.data); // Set appointments state with fetched data
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch appointments when the component mounts
  useEffect(() => {
    getAppointments();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disease</th>
           
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.apptID}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.apptID}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptPatient}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptTime}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptDoctor}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptStatus}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.apptDisease}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
