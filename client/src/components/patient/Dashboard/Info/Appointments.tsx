import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const mail = localStorage.getItem('email');

    const fetchAppointments = async () => {
      try {
        const response = await axios.get<Appointment[]>(
          'http://localhost:5173/getappointmentsbyemail',
          {
            params: {
              email: mail,
            },
          }
        );
        setAppointments(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Your Appointment History</h2>
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-left bg-gray-100 border-b border-gray-200 font-medium">
            <th className="p-4">ID</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time</th>
            <th className="p-4">Doctor</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.apptID} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">{appointment.apptID}</td>
              <td className="p-4">{appointment.apptDate}</td>
              <td className="p-4">{appointment.apptTime}</td>
              <td className="p-4">{appointment.apptDoctor}</td>
              <td className="p-4 text-center flex items-center">
                {appointment.apptStatus === 'scheduled' && (
                  <span className="inline-flex items-center px-3 py-2 rounded-full bg-green-100 text-green-600 font-bold">
                    Scheduled
                  </span>
                )}
                {appointment.apptStatus === 'pending' && (
                  <span className="inline-flex items-center px-3 py-2 rounded-full bg-yellow-100 text-yellow-600 font-bold">
                    Pending
                  </span>
                )}
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No appointments scheduled yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
