import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaUserMd, FaRegClock } from 'react-icons/fa';

interface Appointment {
  _id: string;
  apptID: string;
  apptDate: string;
  apptPatient: string;
  apptTime: string;
  apptDoctor: string;
  apptReason: string;
  apptStatus: string;
  __v: number;
}

const LatestAppointment: React.FC = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLatestAppointment = async () => {
      try {
        const response = await axios.get<Appointment[]>('http://localhost:5173/getappointments');
        const latestAppointment = response.data[0]; // Assuming the first appointment is the latest
        setAppointment(latestAppointment);
      } catch (error) {
        console.error('Error fetching latest appointment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestAppointment();
  }, []);

  return (
    <div className="bg-white rounded-lg border p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointment</h2>
        <FaCalendarAlt className="text-green-500 text-2xl" />
      </div>
      <div className="bg-gray-100 rounded-lg p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {appointment ? (
              <div>
                <div className="flex items-center mb-4">
                  <FaUserMd className="text-gray-600 text-xl mr-4" />
                  <p className="text-gray-700">Dr. {appointment.apptDoctor}</p>
                </div>
                <div className="flex items-center mb-4">
                  <FaRegClock className="text-gray-600 text-xl mr-4" />
                  <p className="text-gray-700">{new Date(appointment.apptDate).toLocaleDateString()} - {appointment.apptTime}</p>
                </div>
              </div>
            ) : (
              <p>No appointments scheduled.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LatestAppointment;
