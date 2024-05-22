import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Appointment {
  _id: string;
  patientName: string;
  apptDate: string;
  apptTime: string;
  status: 'pending' | 'scheduled' | 'completed';
}

const AppointmentSummary: React.FC = () => {
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [scheduledCount, setScheduledCount] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        const response = await axios.get(`/api/appointments/getappointmentsbydate?date=${today}`);
        setTodayAppointments(response.data);

        const pendingCount = response.data.filter((appt: Appointment) => appt.status === 'pending').length;
        const scheduledCount = response.data.filter((appt: Appointment) => appt.status === 'scheduled').length;
        const completedCount = response.data.filter((appt: Appointment) => appt.status === 'completed').length;

        setPendingCount(pendingCount);
        setScheduledCount(scheduledCount);
        setCompletedCount(completedCount);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    fetchTodayAppointments();
  }, []);

  return (
    <div className=" bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-lg  p-8 max-w-md">
        <h2 className="text-lg font-bold mb-6 text-center text-gray-800">Today's Appointments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-purple-100 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-purple-700">Total</h3>
            <p className="text-4xl font-bold text-purple-700">{todayAppointments.length}</p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-yellow-700">Pending</h3>
            <p className="text-4xl font-bold text-yellow-700">{pendingCount}</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-blue-700">Scheduled</h3>
            <p className="text-4xl font-bold text-blue-700">{scheduledCount}</p>
          </div>
          <div className="bg-green-100 rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-green-700">Completed</h3>
            <p className="text-4xl font-bold text-green-700">{completedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;