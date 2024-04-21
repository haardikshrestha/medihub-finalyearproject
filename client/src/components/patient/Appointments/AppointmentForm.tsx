import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface AppointmentFormProps {
  doctorEmail: string;
}

interface DoctorData {
  _id: string;
  fullName: string;
  email: string;
  daysAvailable: string[];
  startTime: string;
  endTime: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorEmail }) => {
  const [apptDate, setApptDate] = useState('');
  const [apptTime, setApptTime] = useState('');
  const [apptDisease, setApptDisease] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const history = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/getdoctorbyemail/${doctorEmail}`);
        setDoctorData(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        setError('Error fetching doctor data');
      }
    };

    fetchDoctorData();
  }, [doctorEmail]);

  useEffect(() => {
    if (doctorData && doctorData.startTime && doctorData.endTime) {
      const start = new Date(`1970-01-01T${doctorData.startTime}`);
      const end = new Date(`1970-01-01T${doctorData.endTime}`);
      const availableTimes = [];

      for (let time = start; time <= end; time.setMinutes(time.getMinutes() + 30)) {
        availableTimes.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }

      setAvailableTimes(availableTimes);
    } else {
      setAvailableTimes([]);
    }
  }, [doctorData]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const apptPatient = localStorage.getItem('userEmail');
      if (!apptPatient) {
        throw new Error('User email not found');
      }
      const appointmentData = {
        apptDate,
        apptPatient,
        apptTime,
        apptDoctor: doctorEmail,
        apptDisease,
      };
      const response = await axios.post('http://localhost:5173/bookappointment', appointmentData);
      console.log(response.data);
      history('/appointment/success');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full max-w-md">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3 mb-6">
          <label htmlFor="apptDate" className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            id="apptDate"
            value={apptDate}
            onChange={(e) => setApptDate(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="w-full px-3 mb-6">
          <label htmlFor="apptTime" className="block text-gray-700 text-sm font-bold mb-2">
            Time
          </label>
          <select
            id="apptTime"
            value={apptTime}
            onChange={(e) => setApptTime(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Time</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full px-3 mb-6">
          <label htmlFor="apptDisease" className="block text-gray-700 text-sm font-bold mb-2">
            Disease
          </label>
          <input
            type="text"
            id="apptDisease"
            value={apptDisease}
            onChange={(e) => setApptDisease(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="w-full px-3 mb-6">
          <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AppointmentForm;